import { Empty, Spin, Table } from 'antd'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import useTranslator from '../../../shared/hooks/useTranslator'
import Patient from '../../../shared/model/Patient'
import Visit from '../../../shared/model/Visit'
import { visitsTableColumnDefinition } from './visits-table-column-definition'

interface Props {
  data: Visit[]
  patientId: string
}

export const VisitsTable = (props: Props) => {
  const { data, patientId } = props
  const { t } = useTranslator()
  const history = useHistory()
  const pagination = { current: 1, pageSize: 10 }

  const onRowClick = useCallback(
    (rowData: Patient) => {
      history.push(`/patients/${patientId}/visits/${rowData.id}`)
    },
    [history],
  )

  if (data === undefined) {
    return <Spin />
  }

  if (data.length === 0) {
    return <Empty description={t('patient.labs.noLabsMessage')} />
  }

  return (
    <Table
      columns={visitsTableColumnDefinition(t, onRowClick)}
      rowKey={(row) => row.id}
      size="middle"
      dataSource={data}
      pagination={pagination}
      loading={false}
    />
  )
}
