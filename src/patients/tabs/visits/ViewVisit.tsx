import findLast from 'lodash/findLast'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useFormModal } from '../../../shared/hooks/useFormModal'
import Visit from '../../../shared/model/Visit'
import { RootState } from '../../../shared/store'
import { VisitForm } from '../../forms/add-visit'

const ViewVisit = () => {
  const { patient } = useSelector((root: RootState) => root.patient)
  const { visitId } = useParams()

  const [visit, setVisit] = useState<Visit | undefined>()
  const { form } = useFormModal()

  const onFinish = (visitData: Visit) => {
    console.log(visitData)
  }

  useEffect(() => {
    if (patient && visitId) {
      const currentVisit = findLast(patient.visits, (c: Visit) => c.id === visitId)
      setVisit(currentVisit)
    }
  }, [setVisit, visitId, patient])

  if (!visit) {
    return null
  }
  return (
    <>
      <h2>{visit?.reason}</h2>
      <VisitForm form={form} onFinish={onFinish} />
    </>
  )
}

export default ViewVisit
