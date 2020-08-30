import { Card, Space } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import Patient from '../../../shared/model/Patient'
import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import { AllergiesList } from './AllergiesList'
import { NewAllergyModal } from './NewAllergyModal'
import ViewAllergy from './ViewAllergy'

interface AllergiesProps {
  patient: Patient
}

const Allergies = (props: AllergiesProps) => {
  const { patient } = props
  const { permissions } = useSelector((state: RootState) => state.user)

  const breadcrumbs = [
    {
      i18nKey: 'patient.allergies.label',
      location: `/patients/${patient.id}/allergies`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  return (
    <Card bordered={false}>
      <Space style={{ marginBottom: 16 }}>
        {permissions.includes(Permissions.AddAllergy) && <NewAllergyModal patientId={patient.id} />}
      </Space>
      <br />
      <Switch>
        <Route exact path="/patients/:id/allergies">
          <AllergiesList patientId={patient.id} />
        </Route>
        <Route exact path="/patients/:id/allergies/:allergyId">
          <ViewAllergy />
        </Route>
      </Switch>
    </Card>
  )
}

export default Allergies
