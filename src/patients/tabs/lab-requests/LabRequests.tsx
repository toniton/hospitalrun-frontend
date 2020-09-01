import { Card } from 'antd'
import React, { useEffect, useState } from 'react'

import PatientRepository from '../../../shared/db/PatientRepository'
import Lab from '../../../shared/model/Lab'
import { LabRequestsTable } from '../../tables/lab-requests/lab-requests-table'

interface Props {
  patientId: string
}

export const LabRequests = (props: Props) => {
  const { patientId } = props

  const [labs, setLabs] = useState<Lab[]>([])

  useEffect(() => {
    const fetch = async () => {
      const fetchedLabs = await PatientRepository.getLabs(patientId)
      setLabs(fetchedLabs)
    }

    fetch()
  }, [patientId])

  return (
    <Card>
      <LabRequestsTable data={labs} />
    </Card>
  )
}
