import { Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'

import useTranslator from '../../shared/hooks/useTranslator'

const { TextArea } = Input

type Props = {
  form: FormInstance
  onFinish: (values: any) => void
}
export const AddNoteForm = (props: Props) => {
  const { t } = useTranslator()
  const { form, onFinish } = props

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item name="text" label={t('patient.note')} rules={[{ required: true }]}>
        <TextArea rows={4} id="text" name="text" />
      </Form.Item>
    </Form>
  )
}
