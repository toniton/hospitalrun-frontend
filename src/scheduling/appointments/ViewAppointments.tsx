/* eslint import/order: "off" */
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Button, Card, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../../page-header/title/useTitle'
import PatientRepository from '../../shared/db/PatientRepository'
import useTranslator from '../../shared/hooks/useTranslator'
import { RootState } from '../../shared/store'
import { Permissions } from '../../shared/model/Permissions'
import { fetchAppointments } from './appointments-slice'

interface Event {
  id: string
  start: Date
  end: Date
  title: string
  allDay: boolean
}

const breadcrumbs = [{ i18nKey: 'scheduling.appointments.label', location: '/appointments' }]

const ViewAppointments = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const dispatch = useDispatch()
  useTitle(t('scheduling.appointments.label'))
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const [events, setEvents] = useState<Event[]>([])
  const { permissions } = useSelector((state: RootState) => state.user)
  useAddBreadcrumbs(breadcrumbs, true)

  useEffect(() => {
    dispatch(fetchAppointments())
  }, [dispatch])
  useEffect(() => {
    const getAppointments = async () => {
      const newEvents = await Promise.all(
        appointments.map(async (a) => {
          const patient = await PatientRepository.find(a.patient)
          return {
            id: a.id,
            start: new Date(a.startDateTime),
            end: new Date(a.endDateTime),
            title: patient.fullName || '',
            allDay: false,
          }
        }),
      )

      setEvents(newEvents)
    }

    if (appointments) {
      getAppointments()
    }
  }, [appointments])

  return (
    <Card>
      <Space style={{ marginBottom: 16 }}>
        {permissions.includes(Permissions.WriteAppointments) && (
          <Button onClick={() => history.push('/appointments/new')}>
            {t('scheduling.appointments.new')}
          </Button>
        )}
      </Space>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
        events={events}
        eventClick={(info) => {
          history.push(`/appointments/${info.event.id}`)
        }}
        headerToolbar={{
          start: 'title',
          center: '',
          end: 'today dayGridMonth list prev,next',
        }}
        initialView="dayGridMonth"
      />
    </Card>
  )
}

export default ViewAppointments
