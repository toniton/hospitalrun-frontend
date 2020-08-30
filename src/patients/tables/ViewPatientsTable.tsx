import { Empty, Button, Spin, Table } from 'antd'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import useTranslator from '../../shared/hooks/useTranslator'
import Patient from '../../shared/model/Patient'
import usePatients from '../hooks/usePatients'
import PatientSearchRequest from '../models/PatientSearchRequest'
import { patientTableColumnDefinition } from './patients-table-column-definition'

interface Props {
  searchRequest: PatientSearchRequest
}

export const ViewPatientsTable = (props: Props) => {
  const { searchRequest } = props
  const { t } = useTranslator()
  const history = useHistory()
  const { data, status } = usePatients(searchRequest)
  const pagination = { current: 1, pageSize: 10 }

  const onRowClick = useCallback(
    (rowData: Patient) => {
      history.push(`/patients/${rowData.id}`)
    },
    [history],
  )

  if (data === undefined || status === 'loading') {
    return <Spin />
  }

  if (data.totalCount === 0) {
    return (
      <Empty description={false}>
        <Button type="primary" onClick={() => history.push('/patients/new')}>
          Create Patient
        </Button>
      </Empty>
    )
  }

  return (
    <Table
      columns={patientTableColumnDefinition(t, onRowClick)}
      rowKey={(row) => row.id}
      size="middle"
      dataSource={data.patients}
      pagination={pagination}
      loading={false}
    />
  )
}
