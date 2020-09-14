import { Card, Space } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import { VisitsTable } from '../../tables/visits/visits-table'
import { AddVisitModal } from './add-visit-modal'
import ViewVisit from './ViewVisit'

export const Visit = () => {
  const { permissions } = useSelector((state: RootState) => state.user)
  const { patient } = useSelector((state: RootState) => state.patient)
  return (
    <Card>
      <Space style={{ marginBottom: 16 }}>
        {permissions.includes(Permissions.AddVisit) && <AddVisitModal patientId={patient.id} />}
      </Space>
      <Switch>
        <Route exact path="/patients/:id/visits">
          <VisitsTable data={patient.visits} patientId={patient.id} />
        </Route>
        <Route exact path="/patients/:id/visits/:visitId">
          <ViewVisit />
        </Route>
      </Switch>
    </Card>
  )
}
