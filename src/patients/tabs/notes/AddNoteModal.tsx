import { Button, Form, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import useTranslator from '../../../shared/hooks/useTranslator'
import Note from '../../../shared/model/Note'
import { AddNoteForm } from '../../forms/add-note'
import { addNote } from '../../patient-slice'

interface Props {
  patientId: string
}

export const AddNoteModal = (props: Props) => {
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

  const onFinish = (note: Note) => {
    dispatch(addNote(patientId, note))
  }

  return (
    <>
      <Button onClick={showModal}>{t('patient.notes.new')}</Button>
      <Modal visible={visible} title={t('patient.notes.new')} onCancel={hideModal} onOk={onOk}>
        <AddNoteForm form={form} onFinish={onFinish} />
      </Modal>
    </>
  )
}
