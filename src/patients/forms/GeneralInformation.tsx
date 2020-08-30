import { MinusCircleOutlined } from '@ant-design/icons'
import { Card, Form, Input, Button, Row, Col, DatePicker, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { startOfDay, subYears } from 'date-fns'
import moment from 'moment'
import React, { ReactElement, useState } from 'react'
import validator from 'validator'

import { SelectBloodGroup } from '../../shared/components/input/SelectBloodGroup'
import { SelectContactInfo } from '../../shared/components/input/SelectContactInfo'
import { SelectGender } from '../../shared/components/input/SelectGender'
import { SelectPatientType } from '../../shared/components/input/SelectPatientType'
import { NotificationBox } from '../../shared/components/notifications/notifications'
import { NotificationTypes } from '../../shared/components/notifications/notifications-slice'
import useTranslator from '../../shared/hooks/useTranslator'
import Patient from '../../shared/model/Patient'
import { onNumericKeyDown } from '../../shared/util/numeric-input'

interface Error {
  message?: string
  prefix?: string
  givenName?: string
  familyName?: string
  suffix?: string
  dateOfBirth?: string
  preferredLanguage?: string
  phoneNumbers?: (string | undefined)[]
  emails?: (string | undefined)[]
}

interface Props {
  patient: Patient
  isEditable?: boolean
  onSubmit?: (newPatient: Patient) => void
  onCancel?: () => void
  error?: Error
}
const { TextArea } = Input

export const GeneralInformation = (props: Props): ReactElement => {
  const { t } = useTranslator()
  const [form] = Form.useForm()
  const [isApproximateDateOfBirth, setIsApproximateDateOfBirth] = useState<boolean>(false)
  const { patient: patientFromProps, isEditable, onSubmit, onCancel, error } = props
  const patient = { ...patientFromProps }
  if (patient.dateOfBirth) {
    patient.dateOfBirth = moment(patient.dateOfBirth)
  }

  const guessDateOfBirthFromApproximateAge = (value: string) => {
    const age = Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value)
    const dateOfBirth = subYears(new Date(Date.now()), age)
    return startOfDay(dateOfBirth).toISOString()
  }

  const onApproximateAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const x = guessDateOfBirthFromApproximateAge(value)
    console.log(x)
  }

  const onUnknownDateOfBirthChange = (event: CheckboxChangeEvent) => {
    const { checked } = event.target
    setIsApproximateDateOfBirth(checked)
  }

  const onFinish = (values: any) => {
    if (onSubmit) {
      const { givenName, familyName = '', suffix = '', dateOfBirth } = values
      values.fullName = `${givenName} ${familyName} ${suffix}`.trim()
      values.dateOfBirth = dateOfBirth
        ? dateOfBirth.format('YYYY-MM-DD')
        : values.approximateAge
        ? guessDateOfBirthFromApproximateAge(values.approximateAge)
        : undefined
      onSubmit(values)
    }
  }

  return (
    <div>
      <Form layout="vertical" form={form} initialValues={patient} onFinish={onFinish}>
        {error?.message && (
          <NotificationBox
            key="123"
            notification={{
              id: 'null',
              key: '123',
              type: NotificationTypes.FAILURE,
              message: t(error?.message),
            }}
          />
        )}
        <Card title={t('patient.basicInformation')}>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Form.Item name="prefix" label={t('patient.prefix')}>
                <Input id="prefix" name="prefix" type="text" disabled={!isEditable} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="givenName"
                label={t('patient.givenName')}
                rules={[{ required: true }]}
              >
                <Input id="givenName" name="givenName" type="text" disabled={!isEditable} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="familyName" label={t('patient.familyName')}>
                <Input id="familyName" name="familyName" type="text" disabled={!isEditable} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="suffix" label={t('patient.suffix')}>
                <Input id="suffix" name="suffix" type="text" disabled={!isEditable} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item name="sex" label={t('patient.sex')}>
                <SelectGender id="sex" name="sex" disabled={!isEditable} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="type" label={t('patient.type')}>
                <SelectPatientType id="type" name="type" disabled={!isEditable} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="bloodType" label={t('patient.bloodType')}>
                <SelectBloodGroup id="bloodType" name="bloodType" disabled={!isEditable} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="approximateAge"
                label={t('patient.approximateAge')}
                hidden={!isApproximateDateOfBirth}
              >
                <Input
                  id="approximateAge"
                  name="approximateAge"
                  type="number"
                  onChange={onApproximateAgeChange}
                  disabled={!isEditable}
                />
              </Form.Item>
              <Form.Item
                name="dateOfBirth"
                label={t('patient.dateOfBirth')}
                hidden={isApproximateDateOfBirth}
              >
                <DatePicker disabled={!isEditable} />
              </Form.Item>
              <Checkbox name="unknown" onChange={onUnknownDateOfBirthChange} disabled={!isEditable}>
                {t('patient.unknownDateOfBirth')}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Form.Item name="occupation" label={t('patient.occupation')}>
                <Input id="occupation" name="occupation" type="text" disabled={!isEditable} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="preferredLanguage" label={t('patient.preferredLanguage')}>
                <Input
                  id="preferredLanguage"
                  name="preferredLanguage"
                  type="text"
                  disabled={!isEditable}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <br />
        <Card title={t('patient.contactInformation')}>
          <Form.List name="phoneNumbers">
            {(fields, { add, remove }) => (
              <Form.Item label={t('patient.phoneNumber')} required={false}>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    style={{ display: 'inline-flex', marginBottom: '8px', width: '60%' }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'type']}
                      fieldKey={[field.fieldKey, 'type']}
                      rules={[{ required: true, message: 'Choose type!' }]}
                      noStyle
                    >
                      <SelectContactInfo disabled={!isEditable} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'value']}
                      fieldKey={[field.fieldKey, 'value']}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input phone number.',
                        },
                        () => ({
                          validator(rule, value) {
                            console.log(rule)
                            if (!value || validator.isMobilePhone(value)) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error('Please input valid phone number!'))
                          },
                        }),
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="xxx xxx xxxx"
                        type="tel"
                        maxLength={12}
                        onKeyPress={onNumericKeyDown}
                        disabled={!isEditable}
                        addonAfter={
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                              remove(field.name)
                            }}
                          />
                        }
                      />
                    </Form.Item>
                  </div>
                ))}
                {isEditable && (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add()
                      }}
                      style={{ width: '60%' }}
                    >
                      Add phone number
                    </Button>
                  </Form.Item>
                )}
              </Form.Item>
            )}
          </Form.List>

          <Form.List name="emails">
            {(fields, { add, remove }) => (
              <div>
                <Form.Item label={t('patient.email')} required={false}>
                  {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '8px' }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'value']}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            type: 'email',
                            message: 'Please input valid email!',
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="johndoe@email.com"
                          type="email"
                          disabled={!isEditable}
                          style={{ width: '60%' }}
                        />
                      </Form.Item>
                      {isEditable && (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      )}
                    </div>
                  ))}
                  {isEditable && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add()
                        }}
                        style={{ width: '60%' }}
                      >
                        Add email
                      </Button>
                    </Form.Item>
                  )}
                </Form.Item>
              </div>
            )}
          </Form.List>

          <Form.List name="addresses">
            {(fields, { add, remove }) => (
              <div>
                <Form.Item label={t('patient.address')} required={false}>
                  {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '8px' }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'value']}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle
                      >
                        <TextArea
                          placeholder="street, city..."
                          allowClear
                          style={{ width: '60%' }}
                          disabled={!isEditable}
                        />
                      </Form.Item>
                      {isEditable && (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      )}
                    </div>
                  ))}
                  {isEditable && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add()
                        }}
                        style={{ width: '60%' }}
                      >
                        Add address
                      </Button>
                    </Form.Item>
                  )}
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Card>
        {isEditable && (
          <Form.Item style={{ marginTop: '16px' }}>
            <Button type="primary" htmlType="submit">
              {t('actions.save')}
            </Button>
            <Button
              type="default"
              htmlType="button"
              style={{ marginLeft: '8px' }}
              onClick={onCancel}
            >
              {t('actions.cancel')}
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  )
}
