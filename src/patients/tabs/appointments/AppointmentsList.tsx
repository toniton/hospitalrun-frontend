import { Button, Card, Space } from 'antd'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import { fetchPatientAppointments } from '../../../scheduling/appointments/appointments-slice'
import useTranslator from '../../../shared/hooks/useTranslator'
import { RootState } from '../../../shared/store'
import { AppointmentsTable } from '../../tables/appointments/appointments-table'

interface Props {
  patientId: string
}

export const AppointmentsList = (props: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslator()

  const { patientId } = props
  const { appointments } = useSelector((state: RootState) => state.appointments)

  const breadcrumbs = [
    {
      i18nKey: 'scheduling.appointments.label',
      location: `/patients/${patientId}/appointments`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  useEffect(() => {
    dispatch(fetchPatientAppointments(patientId))
  }, [dispatch, patientId])

  return (
    <Card bordered={false}>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => history.push('/appointments/new')}>
          {t('scheduling.appointments.new')}
        </Button>
      </Space>
      <AppointmentsTable data={appointments} />
    </Card>
  )
}
