import { Button, Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

import { useFormModal } from '../../../shared/hooks/useFormModal'
import useTranslator from '../../../shared/hooks/useTranslator'
import Visit from '../../../shared/model/Visit'
import { VisitForm } from '../../forms/add-visit'
import { addVisit } from '../../patient-slice'

interface Props {
  patientId: string
}

export const AddVisitModal = (props: Props) => {
  const { patientId } = props
  const dispatch = useDispatch()
  const { t } = useTranslator()
  const { form, visible, showModal, hideModal, onOk } = useFormModal()

  const onFinish = (visit: Visit) => {
    dispatch(addVisit(patientId, visit))
    hideModal()
  }

  return (
    <>
      <Button onClick={showModal}>{t('patient.carePlan.new')}</Button>
      <Modal visible={visible} title={t('patient.visits.new')} onCancel={hideModal} onOk={onOk}>
        <VisitForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  )
}
