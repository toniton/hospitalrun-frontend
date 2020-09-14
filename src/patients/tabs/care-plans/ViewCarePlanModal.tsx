import { Modal, Button, Form } from 'antd'
import React, { useState } from 'react'

import useTranslator from '../../../shared/hooks/useTranslator'
import CarePlan from '../../../shared/model/CarePlan'
import Diagnosis from '../../../shared/model/Diagnosis'
import { CarePlanForm } from '../../forms/add-care-plan'

interface Props {
  carePlan: CarePlan
  diagnoses: Diagnosis[] | undefined
}

export const ViewCarePlanModal = (props: Props) => {
  const { t } = useTranslator()

  const { carePlan, diagnoses } = props

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

  const onFinish = (_: any) => {
    console.log(_)
  }

  return (
    <>
      <Button onClick={showModal}>{t('actions.view')}</Button>
      <Modal visible={visible} title={carePlan?.title} onCancel={hideModal} onOk={onOk}>
        <CarePlanForm form={form} onFinish={onFinish} diagnoses={diagnoses} />
      </Modal>
    </>
  )
}
