import { Button } from 'antd'
import format from 'date-fns/format'
import React from 'react'

import Patient from '../../shared/model/Patient'

export const patientTableColumnDefinition = (t: (key: string) => string, onRowClick: any) => [
  {
    title: t('patient.givenName'),
    dataIndex: 'givenName',
    sorter: true,
    render: (givenName: any, { familyName = '' }: Patient) => `${givenName} ${familyName}`,
  },
  {
    title: t('patient.sex'),
    dataIndex: 'sex',
    sorter: true,
  },
  {
    title: t('patient.dateOfBirth'),
    dataIndex: 'dateOfBirth',
    sorter: true,
    render: (dateOfBirth: string) =>
      dateOfBirth ? format(new Date(dateOfBirth), 'dd MMM, yyyy') : '',
  },
  {
    title: t('actions.label'),
    render: (_: string, rowData: Patient) => (
      <Button type="link" onClick={() => onRowClick && onRowClick(rowData)}>
        {t('actions.view')}
      </Button>
    ),
  },
]

//     { label: t('patient.code'), key: 'code' }
