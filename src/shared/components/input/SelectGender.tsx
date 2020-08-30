import { Select } from 'antd'
import React from 'react'

import useTranslator from '../../hooks/useTranslator'

const { Option } = Select

export const SelectGender = (props: any) => {
  const { t } = useTranslator()

  const options = [
    { label: t('sex.male'), value: 'male' },
    { label: t('sex.female'), value: 'female' },
    { label: t('sex.other'), value: 'other' },
    { label: t('sex.unknown'), value: 'unknown' },
  ]

  return (
    <Select {...props} style={{ minWidth: '120px' }}>
      {options.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
}
