import { Card, Space } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import Patient from '../../../shared/model/Patient'
import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import { AddDiagnosisModal } from './AddDiagnosisModal'
import { DiagnosesList } from './DiagnosesList'

interface Props {
  patient: Patient
}

export const Diagnoses = (props: Props) => {
  const { patient } = props
  const { permissions } = useSelector((state: RootState) => state.user)

  const breadcrumbs = [
    {
      i18nKey: 'patient.diagnoses.label',
      location: `/patients/${patient.id}/diagnoses`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  return (
    <Card>
      <Space style={{ marginBottom: 16 }}>
        {permissions.includes(Permissions.AddDiagnosis) && (
          <AddDiagnosisModal patientId={patient.id} />
        )}
      </Space>
      <DiagnosesList data={patient.diagnoses} />
    </Card>
  )
}
