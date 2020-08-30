import { Input, Form, DatePicker, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { DiagnosisStatus } from '../../shared/model/Diagnosis'

const { TextArea } = Input
const { Option } = Select

interface Props {
  form: FormInstance
  onFinish: (values: any) => void
}

export const DiagnosisForm = (props: Props) => {
  const { t } = useTranslation()
  const { form, onFinish } = props

  const statusOptions = Object.values(DiagnosisStatus).map((value) => ({
    label: value,
    value,
  }))

  const onFormFinish = (values: any) => {
    values.diagnosisDate = values.diagnosisDate.toISOString()
    values.onsetDate = values.onsetDate.toISOString()
    values.abatementDate = values.abatementDate.toISOString()
    onFinish(values)
  }

  return (
    <Form layout="vertical" form={form} onFinish={onFormFinish}>
      <Form.Item
        name="name"
        label={t('patient.diagnoses.diagnosisName')}
        rules={[{ required: true }]}
      >
        <Input id="name" name="name" type="text" />
      </Form.Item>

      <Form.Item
        name="diagnosisDate"
        label={t('patient.diagnoses.diagnosisDate')}
        rules={[{ required: true }]}
      >
        <DatePicker picker="date" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name="onsetDate"
        label={t('patient.diagnoses.onsetDate')}
        rules={[{ required: true }]}
      >
        <DatePicker picker="date" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name="abatementDate"
        label={t('patient.diagnoses.abatementDate')}
        rules={[{ required: true }]}
      >
        <DatePicker picker="date" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item name="status" label={t('patient.diagnoses.status')} rules={[{ required: true }]}>
        <Select>
          {statusOptions.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="note" label={t('patient.diagnoses.note')}>
        <TextArea id="note" name="note" placeholder={t('patient.diagnoses.note')} allowClear />
      </Form.Item>
    </Form>
  )
}
