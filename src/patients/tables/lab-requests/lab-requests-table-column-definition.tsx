import { Button } from 'antd'
import format from 'date-fns/format'
import React from 'react'

import Lab from '../../../shared/model/Lab'

export const labRequestsTableColumnDefinition = (t: (key: string) => string, onRowClick: any) => [
  {
    title: t('labs.lab.type'),
    dataIndex: 'type',
  },
  {
    title: t('labs.lab.requestedOn'),
    dataIndex: 'requestedOn',
    render: (requestedOn: any) =>
      requestedOn ? format(new Date(requestedOn), 'yyyy-MM-dd, hh:mm a') : '',
  },
  {
    title: t('labs.lab.status'),
    dataIndex: 'status',
  },
  {
    title: t('actions.label'),
    render: (_: string, rowData: Lab) => (
      <Button type="link" onClick={() => onRowClick && onRowClick(rowData)}>
        {t('actions.view')}
      </Button>
    ),
  },
]
