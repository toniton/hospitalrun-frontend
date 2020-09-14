import { Empty, Spin, Table } from 'antd'
import React from 'react'

import useTranslator from '../../../shared/hooks/useTranslator'
import CarePlan from '../../../shared/model/CarePlan'
import Diagnosis from '../../../shared/model/Diagnosis'
import { carePlansTableColumnDefinition } from './care-plans-table-column-definition'

interface Props {
  data: CarePlan[]
  diagnoses: Diagnosis[] | undefined
}

export const CarePlansTable = (props: Props) => {
  const { data, diagnoses = [] } = props
  const { t } = useTranslator()
  const pagination = { current: 1, pageSize: 10 }

  if (data === undefined) {
    return <Spin />
  }

  if (data.length === 0) {
    return <Empty description={t('patient.labs.noLabsMessage')} />
  }

  return (
    <Table
      columns={carePlansTableColumnDefinition(t, diagnoses)}
      rowKey={(row) => row.id}
      size="middle"
      dataSource={data}
      pagination={pagination}
      loading={false}
    />
  )
}
