import { Select } from 'antd'
import React from 'react'

import useTranslator from '../../hooks/useTranslator'

const { Option } = Select

export const SelectPatientType = (props: any) => {
  const { t } = useTranslator()

  const options = [
    { label: t('patient.types.charity'), value: 'charity' },
    { label: t('patient.types.private'), value: 'private' },
  ]

  return (
    <Select {...props} style={{ minWidth: '120px' }}>
      {options.map(({ label, value }) => (
        <Option value={value}>{label}</Option>
      ))}
    </Select>
  )
}
