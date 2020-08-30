import { Select } from 'antd'
import React, { ReactElement } from 'react'

import useTranslator from '../../hooks/useTranslator'

const { Option } = Select

export enum ContactInfoTypes {
  home = 'home',
  mobile = 'mobile',
  work = 'work',
  temporary = 'temporary',
  old = 'old',
}

export const SelectContactInfo = (): ReactElement => {
  const { t } = useTranslator()
  const typeOptions = Object.values(ContactInfoTypes).map((value) => ({
    label: t(`patient.contactInfoType.options.${value}`),
    value: `${value}`,
  }))
  return (
    <Select style={{ minWidth: '120px' }}>
      {typeOptions.map(({ label, value }) => (
        <Option value={value}>{label}</Option>
      ))}
    </Select>
  )
}
