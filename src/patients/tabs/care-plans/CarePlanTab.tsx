import { Button } from '@hospitalrun/components'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import useTranslator from '../../../shared/hooks/useTranslator'
import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import AddCarePlanModal from './AddCarePlanModal'
import CarePlanTable from './CarePlanTable'
import ViewCarePlan from './ViewCarePlan'

const CarePlanTab = () => {
  const { t } = useTranslator()
  const { permissions } = useSelector((state: RootState) => state.user)
  const [showAddCarePlanModal, setShowAddCarePlanModal] = useState(false)
  return (
    <>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end">
          {permissions.includes(Permissions.AddCarePlan) && (
            <Button
              outlined
              color="success"
              icon="add"
              iconLocation="left"
              onClick={() => setShowAddCarePlanModal(true)}
            >
              {t('patient.carePlan.new')}
            </Button>
          )}
        </div>
      </div>
      <br />
      <Switch>
        <Route exact path="/patients/:id/care-plans">
          <CarePlanTable />
        </Route>
        <Route exact path="/patients/:id/care-plans/:carePlanId">
          <ViewCarePlan />
        </Route>
      </Switch>
      <AddCarePlanModal
        show={showAddCarePlanModal}
        onCloseButtonClick={() => setShowAddCarePlanModal(false)}
      />
    </>
  )
}

export default CarePlanTab
