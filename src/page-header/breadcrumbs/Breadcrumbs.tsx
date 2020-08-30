import { Breadcrumb } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import useTranslator from '../../shared/hooks/useTranslator'
import { RootState } from '../../shared/store'

export const Breadcrumbs = () => {
  const { t } = useTranslator()
  const { breadcrumbs } = useSelector((state: RootState) => state.breadcrumbs)

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb style={{ marginBottom: '16px' }}>
      {breadcrumbs.map(({ i18nKey, text, location }, index) => {
        const isLast = index === breadcrumbs.length - 1
        const url = !isLast ? location : '#'
        return (
          <Breadcrumb.Item key={location}>
            <Link to={url}>{i18nKey ? t(i18nKey) : text}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
