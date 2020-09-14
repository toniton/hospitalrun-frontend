import { Form, Input, Select, DatePicker, Row, Col } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import { CarePlanStatus, CarePlanIntent } from '../../shared/model/CarePlan'
import Diagnosis from '../../shared/model/Diagnosis'

const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

interface Props {
  form: FormInstance
  onFinish: (values: any) => void
  diagnoses: Diagnosis[] | undefined
}

export const CarePlanForm = (props: Props) => {
  const { form, onFinish, diagnoses = [] } = props
  const { t } = useTranslator()

  const conditionOptions = diagnoses.map((d) => ({ label: d.name, value: d.id })) || []

  const statusOptions = Object.values(CarePlanStatus).map((value) => ({ label: value, value }))

  const intentOptions = Object.values(CarePlanIntent).map((value) => ({ label: value, value }))

  const onFormFinish = (values: any) => {
    values.startDate = values.dateRange[0].toISOString()
    values.endDate = values.dateRange[0].toISOString()
    delete values.dateRange
    onFinish(values)
  }

  return (
    <Form layout="vertical" form={form} onFinish={onFormFinish}>
      <Form.Item name="title" label={t('patient.carePlan.title')} rules={[{ required: true }]}>
        <Input id="title" name="title" type="text" />
      </Form.Item>

      <Form.Item
        name="description"
        label={t('patient.carePlan.description')}
        rules={[{ required: true }]}
      >
        <TextArea
          id="description"
          name="description"
          placeholder={t('patient.carePlan.description')}
        />
      </Form.Item>

      <Form.Item
        name="diagnosisId"
        label={t('patient.carePlan.condition')}
        rules={[{ required: true }]}
      >
        <Select>
          {conditionOptions.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="status"
            label={t('patient.carePlan.status')}
            rules={[{ required: true }]}
          >
            <Select>
              {statusOptions.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="intent"
            label={t('patient.carePlan.intent')}
            rules={[{ required: true }]}
          >
            <Select>
              {intentOptions.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="dateRange"
        label={`${t('patient.carePlan.startDate')} - ${t('patient.carePlan.endDate')}`}
        rules={[{ required: true }]}
      >
        <RangePicker picker="date" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item name="note" label={t('patient.carePlan.note')}>
        <TextArea id="note" name="note" placeholder={t('patient.carePlan.note')} />
      </Form.Item>
    </Form>
  )
}
