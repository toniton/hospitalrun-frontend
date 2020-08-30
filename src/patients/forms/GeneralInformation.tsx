import { MinusCircleOutlined } from '@ant-design/icons'
import { Alert } from '@hospitalrun/components'
import { Card, Form, Input, Button, Row, Col, DatePicker, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { startOfDay, subYears } from 'date-fns'
import React, { ReactElement } from 'react'

import { SelectBloodGroup } from '../../shared/components/input/SelectBloodGroup'
import { SelectContactInfo } from '../../shared/components/input/SelectContactInfo'
import { SelectGender } from '../../shared/components/input/SelectGender'
import { SelectPatientType } from '../../shared/components/input/SelectPatientType'
import useTranslator from '../../shared/hooks/useTranslator'
import { ContactInfoPiece } from '../../shared/model/ContactInformation'
import Patient from '../../shared/model/Patient'

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
  onChange?: (newPatient: Partial<Patient>) => void
  error?: Error
}
const { TextArea } = Input

export const GeneralInformation = (props: Props): ReactElement => {
  const { t } = useTranslator()
  const { patient, isEditable, onChange, error } = props

  const onFieldChange = (name: string, value: string | boolean | ContactInfoPiece[]) => {
    if (onChange) {
      const newPatient = {
        ...patient,
        [name]: value,
      }
      onChange(newPatient)
    }
  }

  const guessDateOfBirthFromApproximateAge = (value: string) => {
    const age = Number.isNaN(parseFloat(value)) ? 0 : parseFloat(value)
    const dateOfBirth = subYears(new Date(Date.now()), age)
    return startOfDay(dateOfBirth).toISOString()
  }

  const onApproximateAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    onFieldChange('dateOfBirth', guessDateOfBirthFromApproximateAge(value))
  }

  const onUnknownDateOfBirthChange = (event: CheckboxChangeEvent) => {
    const { checked } = event.target
    onFieldChange('isApproximateDateOfBirth', checked)
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <Form layout="vertical">
        {error?.message && <Alert className="alert" color="danger" message={t(error?.message)} />}
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
                hidden={!patient.isApproximateDateOfBirth}
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
                hidden={patient.isApproximateDateOfBirth}
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
          <Form.List name="phoneNumber">
            {(fields, { add, remove }) => (
              <div>
                <Form.Item label={t('patient.phoneNumber')} required={false}>
                  {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '8px' }}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input valid phone number.',
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          addonBefore={<SelectContactInfo />}
                          placeholder="xxx xxx xxxx"
                          style={{ width: '60%' }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      ) : null}
                    </div>
                  ))}
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
                </Form.Item>
              </div>
            )}
          </Form.List>

          <Form.List name="email">
            {(fields, { add, remove }) => (
              <div>
                <Form.Item label={t('patient.email')} required={false}>
                  {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '8px' }}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input valid email.',
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="johndoe@email.com"
                          type="email"
                          style={{ width: '60%' }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      ) : null}
                    </div>
                  ))}
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
                </Form.Item>
              </div>
            )}
          </Form.List>

          <Form.List name="address">
            {(fields, { add, remove }) => (
              <div>
                <Form.Item label={t('patient.address')} required={false}>
                  {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '8px' }}>
                      <Form.Item {...field} validateTrigger={['onChange', 'onBlur']} noStyle>
                        <TextArea
                          placeholder="street, city..."
                          allowClear
                          style={{ width: '60%' }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      ) : null}
                    </div>
                  ))}
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
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Card>
      </Form>
    </div>
  )
}
