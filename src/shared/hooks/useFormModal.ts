import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useState, Dispatch, SetStateAction } from 'react'

type UseFormModal = {
  form: FormInstance
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  showModal: () => void
  hideModal: () => void
  onOk: () => void
}
export const useFormModal = (): UseFormModal => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState<boolean>(false)

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
    form.resetFields()
  }

  const onOk = () => {
    form.submit()
  }
  return {
    form,
    visible,
    setVisible,
    showModal,
    hideModal,
    onOk,
  }
}
