import { Modal, Button, Form } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useTranslator from '../../../shared/hooks/useTranslator'
import { RootState } from '../../../shared/store'
import { AddRelatedPersonForm } from '../../forms/add-related-person'
import { addRelatedPerson } from '../../patient-slice'

export const AddRelatedPersonModalButton = () => {
  const dispatch = useDispatch()
  const { t } = useTranslator()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState<boolean>(false)
  const { patient } = useSelector((state: RootState) => state.patient)

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
  }

  const onOk = () => {
    form.submit()
  }

  const onFinish = (values: any) => {
    dispatch(addRelatedPerson(patient.id, values))
  }

  return (
    <>
      <Button onClick={showModal}>{t('patient.relatedPersons.add')}</Button>
      <Modal
        visible={visible}
        title={t('patient.relatedPersons.add')}
        onCancel={hideModal}
        onOk={onOk}
      >
        <AddRelatedPersonForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  )
}
