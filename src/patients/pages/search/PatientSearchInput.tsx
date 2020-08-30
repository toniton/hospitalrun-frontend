import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

import useDebounce from '../../../shared/hooks/useDebounce'
import useTranslator from '../../../shared/hooks/useTranslator'
import PatientSearchRequest from '../../models/PatientSearchRequest'

const { Search } = Input
interface Props {
  onChange: (searchRequest: PatientSearchRequest) => void
}

const PatientSearchInput = (props: Props) => {
  const { onChange } = props
  const { t } = useTranslator()

  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchText = useDebounce(searchText, 500)

  useEffect(() => {
    onChange({
      queryString: debouncedSearchText,
    })
  }, [debouncedSearchText, onChange])

  const onSearchBoxChange = (queryString: string) => {
    console.log(queryString)
    setSearchText(queryString)
  }

  return (
    <Search
      placeholder={t('actions.search')}
      onSearch={onSearchBoxChange}
      style={{ width: '100vw', maxWidth: '280px' }}
    />
  )
}

export default PatientSearchInput
