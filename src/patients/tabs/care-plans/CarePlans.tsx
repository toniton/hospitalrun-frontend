import { Space, Card } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import { CarePlansTable } from '../../tables/care-plans/care-plans-table'
import { AddCarePlanModal } from './AddCarePlanModal'

export const CarePlans = () => {
  const { permissions } = useSelector((state: RootState) => state.user)
  const { patient } = useSelector((state: RootState) => state.patient)

  return (
    <Card>
      <Space style={{ marginBottom: 16 }}>
        {permissions.includes(Permissions.AddDiagnosis) && (
          <AddCarePlanModal patientId={patient.id} diagnoses={patient.diagnoses} />
        )}
      </Space>
      <br />
      <CarePlansTable data={patient.carePlans} diagnoses={patient.diagnoses} />
    </Card>
  )
}
