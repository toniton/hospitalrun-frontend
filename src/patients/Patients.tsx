import React from 'react'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'

import PrivateRoute from '../shared/components/PrivateRoute'
import { Permissions } from '../shared/model/Permissions'
import { RootState } from '../shared/store'
import EditPatient from './pages/edit/EditPatient'
import NewPatient from './pages/new/NewPatient'
import ViewPatients from './pages/search/ViewPatients'
import ViewPatient from './pages/view/ViewPatient'

const Patients = () => {
  const permissions = useSelector((state: RootState) => state.user.permissions)
  return (
    <Switch>
      <PrivateRoute
        isAuthenticated={permissions.includes(Permissions.ReadPatients)}
        exact
        path="/patients"
        component={ViewPatients}
      />
      <PrivateRoute
        isAuthenticated={permissions.includes(Permissions.WritePatients)}
        exact
        path="/patients/new"
        component={NewPatient}
      />
      <PrivateRoute
        isAuthenticated={
          permissions.includes(Permissions.WritePatients) &&
          permissions.includes(Permissions.ReadPatients)
        }
        exact
        path="/patients/edit/:id"
        component={EditPatient}
      />
      <PrivateRoute
        isAuthenticated={permissions.includes(Permissions.ReadPatients)}
        path="/patients/:id"
        component={ViewPatient}
      />
    </Switch>
  )
}

export default Patients
