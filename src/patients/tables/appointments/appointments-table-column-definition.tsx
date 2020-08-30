import { Button } from 'antd'
import format from 'date-fns/format'
import React from 'react'

import Appointment from '../../../shared/model/Appointment'

export const appointmentsTableColumnDefinition = (t: (key: string) => string, onRowClick: any) => [
  {
    title: t('scheduling.appointment.startDate'),
    dataIndex: 'startDateTime',
    render: (startDateTime: any) =>
      startDateTime ? format(new Date(startDateTime), 'yyyy-MM-dd, hh:mm a') : '',
  },
  {
    title: t('scheduling.appointment.endDate'),
    dataIndex: 'endDateTime',
    render: (endDateTime: any) =>
      endDateTime ? format(new Date(endDateTime), 'yyyy-MM-dd, hh:mm a') : '',
  },
  {
    title: t('scheduling.appointment.location'),
    dataIndex: 'location',
  },
  {
    title: t('scheduling.appointment.type'),
    dataIndex: 'type',
  },
  {
    title: t('actions.label'),
    render: (_: string, rowData: Appointment) => (
      <Button type="link" onClick={() => onRowClick && onRowClick(rowData)}>
        {t('actions.view')}
      </Button>
    ),
  },
]
