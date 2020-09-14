import { Button } from 'antd'
import format from 'date-fns/format'
import React from 'react'

import Visit from '../../../shared/model/Visit'

export const visitsTableColumnDefinition = (t: (key: string) => string, onRowClick: any) => [
  {
    title: t('patient.visits.startDateTime'),
    dataIndex: 'startDateTime',
    render: (startDateTime: any) =>
      startDateTime ? format(new Date(startDateTime), 'yyyy-MM-dd, hh:mm a') : '',
  },
  {
    title: t('patient.visits.endDateTime'),
    dataIndex: 'endDateTime',
    render: (endDateTime: any) =>
      endDateTime ? format(new Date(endDateTime), 'yyyy-MM-dd, hh:mm a') : '',
  },
  {
    title: t('patient.visits.type'),
    dataIndex: 'type',
  },
  {
    title: t('patient.visits.status'),
    dataIndex: 'status',
  },
  {
    title: t('patient.visits.reason'),
    dataIndex: 'reason',
  },
  {
    title: t('patient.visits.location'),
    dataIndex: 'location',
  },
  {
    title: t('actions.label'),
    render: (_: string, rowData: Visit) => (
      <Button type="link" onClick={() => onRowClick && onRowClick(rowData)}>
        {t('actions.view')}
      </Button>
    ),
  },
]
