import { Badge } from 'antd'
import format from 'date-fns/format'
import React from 'react'

import CarePlan from '../../../shared/model/CarePlan'
import Diagnosis from '../../../shared/model/Diagnosis'
import { ViewCarePlanModal } from '../../tabs/care-plans/ViewCarePlanModal'

export const carePlansTableColumnDefinition = (
  t: (key: string) => string,
  diagnoses: Diagnosis[],
) => [
  {
    title: t('patient.carePlan.title'),
    dataIndex: 'title',
  },
  {
    title: t('patient.carePlan.startDate'),
    dataIndex: 'startDate',
    render: (startDate: any) =>
      startDate ? format(new Date(startDate), 'yyyy-MM-dd, hh:mm a') : '',
  },
  {
    title: t('patient.carePlan.endDate'),
    dataIndex: 'endDate',
    render: (endDate: any) => (endDate ? format(new Date(endDate), 'yyyy-MM-dd, hh:mm a') : ''),
  },
  {
    title: t('patient.carePlan.status'),
    dataIndex: 'status',
    render: (status: string) => <Badge color="#f50">{status}</Badge>,
  },
  {
    title: t('actions.label'),
    render: (_: string, rowData: CarePlan) => (
      <ViewCarePlanModal carePlan={rowData} diagnoses={diagnoses} />
    ),
  },
]
