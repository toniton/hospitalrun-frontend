import { Modal, Button, Form } from 'antd'
import React, { useState } from 'react'

import useTranslator from '../../../shared/hooks/useTranslator'
import Allergy from '../../../shared/model/Allergy'
import { AddAllergyForm } from '../../forms/add-allergy'
import useAddAllergy from '../../hooks/useAddAllergy'

interface NewAllergyModalProps {
  patientId: string
}

export const AddAllergyModal = (props: NewAllergyModalProps) => {
  const { patientId } = props
  const { t } = useTranslator()
  const [mutate] = useAddAllergy()
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

  const onFinish = async (allergy: Allergy) => {
    try {
      await mutate({ patientId, allergy })
      hideModal()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Button onClick={showModal}>{t('patient.allergies.new')}</Button>
      <Modal visible={visible} title={t('patient.allergies.new')} onCancel={hideModal} onOk={onOk}>
        <AddAllergyForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  )
}
