import { Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'

import useTranslator from '../../shared/hooks/useTranslator'

type Props = {
  form: FormInstance
  onFinish: (values: any) => void
}
export const AddAllergyForm = (props: Props) => {
  const { t } = useTranslator()
  const { form, onFinish } = props

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="name"
        label={t('patient.allergies.allergyName')}
        rules={[{ required: true }]}
      >
        <Input id="name" name="name" type="text" />
      </Form.Item>
    </Form>
  )
}
