import { Card, Space } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

import Patient from '../../../shared/model/Patient'
import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import { AddNoteModal } from './AddNoteModal'
import { NoteList } from './NotesList'

interface Props {
  patient: Patient
}

export const Notes = (props: Props) => {
  const { patient } = props
  const { permissions } = useSelector((state: RootState) => state.user)

  return (
    <Card>
      <Space style={{ marginBottom: 16 }}>
        {permissions.includes(Permissions.WritePatients) && <AddNoteModal patientId={patient.id} />}
      </Space>
      <NoteList data={patient.notes} />
    </Card>
  )
}
