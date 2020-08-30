import { Button, Modal, Form } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import useTranslator from '../../../shared/hooks/useTranslator'
import Diagnosis from '../../../shared/model/Diagnosis'
import { DiagnosisForm } from '../../forms/add-diagnosis'
import { addDiagnosis } from '../../patient-slice'

interface Props {
  patientId: string
}

export const AddDiagnosisModal = (props: Props) => {
  const { patientId } = props
  const dispatch = useDispatch()
  const { t } = useTranslator()

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

  const onFinish = (diagnosis: Diagnosis) => {
    dispatch(addDiagnosis(patientId, diagnosis))
  }

  return (
    <>
      <Button onClick={showModal}>{t('patient.diagnoses.new')}</Button>
      <Modal visible={visible} title={t('patient.diagnoses.new')} onCancel={hideModal} onOk={onOk}>
        <DiagnosisForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  )
}
