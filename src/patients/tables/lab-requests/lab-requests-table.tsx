import { Empty, Spin, Table } from 'antd'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import useTranslator from '../../../shared/hooks/useTranslator'
import Lab from '../../../shared/model/Lab'
import Patient from '../../../shared/model/Patient'
import { labRequestsTableColumnDefinition } from './lab-requests-table-column-definition'

interface Props {
  data: Lab[]
}

export const LabRequestsTable = (props: Props) => {
  const { data } = props
  const { t } = useTranslator()
  const history = useHistory()
  const pagination = { current: 1, pageSize: 10 }

  const onRowClick = useCallback(
    (rowData: Patient) => {
      history.push(`/labs/${rowData.id}`)
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
      columns={labRequestsTableColumnDefinition(t, onRowClick)}
      rowKey={(row) => row.id}
      size="middle"
      dataSource={data}
      pagination={pagination}
      loading={false}
    />
  )
}
