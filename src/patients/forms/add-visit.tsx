import { Form, DatePicker, Input, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import { VisitStatus } from '../../shared/model/Visit'

const { Option } = Select
const { RangePicker } = DatePicker

interface Props {
  form: FormInstance
  onFinish: (values: any) => void
}

export const VisitForm = (props: Props) => {
  const { t } = useTranslator()
  const { form, onFinish } = props

  const statusOptions = Object.values(VisitStatus).map((v) => ({ label: v, value: v })) || []

  const onFormFinish = (values: any) => {
    console.log(values)
    values.startDate = values.dateRange[0].toISOString()
    values.endDate = values.dateRange[0].toISOString()
    delete values.dateRange
    onFinish(values)
  }

  return (
    <Form layout="vertical" form={form} onFinish={onFormFinish}>
      <Form.Item
        name="dateRange"
        label={`${t('patient.visits.startDateTime')} - ${t('patient.visits.endDateTime')}`}
        rules={[{ required: true }]}
      >
        <RangePicker picker="date" format="YYYYM-DD" />
      </Form.Item>
      <Form.Item name="type" label={t('patient.visits.type')} rules={[{ required: true }]}>
        <Input id="type" name="type" type="text" />
      </Form.Item>
      <Form.Item name="status" label={t('patient.visits.status')} rules={[{ required: true }]}>
        <Select>
          {statusOptions.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="reason" label={t('patient.visits.reason')}>
        <Input id="reason" name="reason" type="text" />
      </Form.Item>
      <Form.Item name="location" label={t('patient.visits.location')} rules={[{ required: true }]}>
        <Input id="location" name="location" type="text" />
      </Form.Item>
    </Form>
  )
}
