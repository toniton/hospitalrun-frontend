import { Space } from 'antd'
import React, { useCallback, useState } from 'react'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../../../page-header/title/useTitle'
import useTranslator from '../../../shared/hooks/useTranslator'
import PatientSearchRequest from '../../models/PatientSearchRequest'
import { ViewPatientsTable } from '../../tables/ViewPatientsTable'
import PatientSearchInput from './PatientSearchInput'

const breadcrumbs = [{ i18nKey: 'patients.label', location: '/patients' }]

const ViewPatients = () => {
  const { t } = useTranslator()
  useTitle(t('patients.label'))

  useAddBreadcrumbs(breadcrumbs, true)

  const [searchRequest, setSearchRequest] = useState<PatientSearchRequest>({ queryString: '' })

  const onSearchRequestChange = useCallback((newSearchRequest: PatientSearchRequest) => {
    setSearchRequest(newSearchRequest)
  }, [])

  return (
    <div>
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <PatientSearchInput onChange={onSearchRequestChange} />
      </Space>
      <ViewPatientsTable searchRequest={searchRequest} />
    </div>
  )
}

export default ViewPatients
