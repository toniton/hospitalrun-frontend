import { Empty, Spin, Table } from 'antd'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import useTranslator from '../../../shared/hooks/useTranslator'
import Appointment from '../../../shared/model/Appointment'
import Patient from '../../../shared/model/Patient'
import { appointmentsTableColumnDefinition } from './appointments-table-column-definition'

interface Props {
  data: Appointment[]
}

export const AppointmentsTable = (props: Props) => {
  const { data } = props
  const { t } = useTranslator()
  const history = useHistory()
  const pagination = { current: 1, pageSize: 10 }

  const onRowClick = useCallback(
    (rowData: Patient) => {
      history.push(`/patients/${rowData.id}`)
    },
    [history],
  )

  if (data === undefined) {
    return <Spin />
  }

  if (data.length === 0) {
    return <Empty description={t('patient.appointments.addAppointmentAbove')} />
  }

  return (
    <Table
      columns={appointmentsTableColumnDefinition(t, onRowClick)}
      rowKey={(row) => row.id}
      size="middle"
      dataSource={data}
      pagination={pagination}
      loading={false}
    />
  )
}
