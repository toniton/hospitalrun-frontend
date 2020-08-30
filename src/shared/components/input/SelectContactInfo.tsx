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

export const SelectContactInfo = (props: any): ReactElement => {
  const { t } = useTranslator()
  const typeOptions = Object.values(ContactInfoTypes).map((value) => ({
    label: t(`patient.contactInfoType.options.${value}`),
    value: `${value}`,
  }))
  return (
    <Select style={{ minWidth: '80px', width: '100%', maxWidth: '120px' }} {...props}>
      {typeOptions.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
}
