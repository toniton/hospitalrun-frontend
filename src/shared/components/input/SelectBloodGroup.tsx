import { Select } from 'antd'
import React from 'react'

import useTranslator from '../../hooks/useTranslator'

const { Option } = Select

export const SelectBloodGroup = (props: any) => {
  const { t } = useTranslator()

  const options = [
    { label: t('bloodType.apositive'), value: 'A+' },
    { label: t('bloodType.anegative'), value: 'A-' },
    { label: t('bloodType.abpositive'), value: 'AB+' },
    { label: t('bloodType.abnegative'), value: 'AB-' },
    { label: t('bloodType.bpositive'), value: 'B+' },
    { label: t('bloodType.bnegative'), value: 'B-' },
    { label: t('bloodType.opositive'), value: 'O+' },
    { label: t('bloodType.onegative'), value: 'O-' },
    { label: t('bloodType.unknown'), value: 'unknown' },
  ]

  return (
    <Select {...props} style={{ minWidth: '120px' }}>
      {options.map(({ label, value }) => (
        <Option value={value}>{label}</Option>
      ))}
    </Select>
  )
}
