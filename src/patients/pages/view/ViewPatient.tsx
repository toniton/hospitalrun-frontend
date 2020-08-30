import { Tabs, Spin } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useParams,
  withRouter,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../../../page-header/title/useTitle'
import useTranslator from '../../../shared/hooks/useTranslator'
import { RootState } from '../../../shared/store'
import { GeneralInformation } from '../../forms/GeneralInformation'
import { fetchPatient } from '../../patient-slice'
import Allergies from '../../tabs/allergies/Allergies'
import { AppointmentsList } from '../../tabs/appointments/AppointmentsList'
import CarePlanTab from '../../tabs/care-plans/CarePlanTab'
import { Diagnoses } from '../../tabs/diagnoses/Diagnoses'
import LabsTab from '../../tabs/labs/LabsTab'
import NoteTab from '../../tabs/notes/NoteTab'
import { RelatedPersonTab } from '../../tabs/related-persons/RelatedPersonTab'
import VisitTab from '../../tabs/visits/VisitTab'

const { TabPane } = Tabs

const ViewPatient = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const { path } = useRouteMatch()
  const [activeTab, setActiveTab] = useState<string>('')

  const { patient, status } = useSelector((state: RootState) => state.patient)
  const { permissions } = useSelector((state: RootState) => state.user)

  const { givenName, familyName = '', suffix = '', code = '' } = patient
  const fullName = `${givenName} ${familyName} ${suffix}`.trim()

  const onTabChange = useCallback(
    (tabKey: string) => {
      const tabPath = tabKey === 'generalInformation' ? '' : `/${tabKey}`
      history.push(`/patients/${patient.id}${tabPath}`)
    },
    [history, patient],
  )

  useEffect(() => {
    let key = location.pathname.split('/').pop() || patient.id
    key = key === patient.id ? 'generalInformation' : key
    setActiveTab(key)
  }, [location, activeTab, patient])

  useTitle(`${fullName} (${code})`)

  const breadcrumbs = [
    { i18nKey: 'patients.label', location: '/patients' },
    { text: fullName, location: `/patients/${patient.id}` },
  ]
  useAddBreadcrumbs(breadcrumbs, true)

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(fetchPatient(id))
    }
  }, [dispatch, id, history, permissions])

  if (status === 'loading' || !patient) {
    return <Spin />
  }

  return (
    <Tabs defaultActiveKey="generalInformation" activeKey={activeTab} onChange={onTabChange}>
      <TabPane tab={t('patient.generalInformation')} key="generalInformation">
        <Route exact path={path}>
          <GeneralInformation patient={patient} />
        </Route>
      </TabPane>
      <TabPane tab={t('patient.relatedPersons.label')} key="relatedPersons">
        <Route exact path={`${path}/relatedpersons`}>
          <RelatedPersonTab patient={patient} />
        </Route>
      </TabPane>
      <TabPane tab={t('scheduling.appointments.label')} key="appointments">
        <Route exact path={`${path}/appointments`}>
          <AppointmentsList patientId={patient.id} />
        </Route>
      </TabPane>
      <TabPane tab={t('patient.allergies.label')} key="allergies">
        <Route path={`${path}/allergies`}>
          <Allergies patient={patient} />
        </Route>
      </TabPane>
      <TabPane tab={t('patient.diagnoses.label')} key="diagnoses">
        <Route exact path={`${path}/diagnoses`}>
          <Diagnoses patient={patient} />
        </Route>
      </TabPane>
      <TabPane tab={t('patient.notes.label')} key="notes">
        <Route exact path={`${path}/notes`}>
          <NoteTab patient={patient} />
        </Route>
      </TabPane>
      <TabPane tab={t('patient.labs.label')} key="labs">
        <Route exact path={`${path}/labs`}>
          <LabsTab patientId={patient.id} />
        </Route>
      </TabPane>
      <TabPane tab={t('patient.carePlan.label')} key="carePlan">
        <Route path={`${path}/care-plans`}>
          <CarePlanTab />
        </Route>
      </TabPane>
      <TabPane tab={t('patient.visits.label')} key="visits">
        <Route path={`${path}/visits`}>
          <VisitTab />
        </Route>
      </TabPane>
    </Tabs>
  )
}

export default withRouter(ViewPatient)
