import { Modal, Button, Form } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import useTranslator from '../../../shared/hooks/useTranslator'
import CarePlan from '../../../shared/model/CarePlan'
import Diagnosis from '../../../shared/model/Diagnosis'
import { CarePlanForm } from '../../forms/add-care-plan'
import { addCarePlan } from '../../patient-slice'

interface Props {
  patientId: string
  diagnoses: Diagnosis[] | undefined
}

export const AddCarePlanModal = (props: Props) => {
  const dispatch = useDispatch()
  const { t } = useTranslator()

  const { patientId, diagnoses } = props

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

  const onFinish = (carePlan: CarePlan) => {
    console.log(carePlan)
    dispatch(addCarePlan(patientId, carePlan))
  }

  return (
    <>
      <Button onClick={showModal}>{t('patient.carePlan.new')}</Button>
      <Modal visible={visible} title={t('patient.carePlan.new')} onCancel={hideModal} onOk={onOk}>
        <CarePlanForm form={form} onFinish={onFinish} diagnoses={diagnoses} />
      </Modal>
    </>
  )
}
