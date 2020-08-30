import { ListItem } from '@hospitalrun/components'
import { act } from '@testing-library/react'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Sidebar from '../../../shared/components/sidebar/Sidebar'
import { Permissions } from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('Sidebar', () => {
  let history = createMemoryHistory()
  const allPermissions = [
    Permissions.ReadPatients,
    Permissions.WritePatients,
    Permissions.ReadAppointments,
    Permissions.WriteAppointments,
    Permissions.DeleteAppointment,
    Permissions.AddAllergy,
    Permissions.AddDiagnosis,
    Permissions.RequestLab,
    Permissions.CancelLab,
    Permissions.CompleteLab,
    Permissions.ViewLab,
    Permissions.ViewLabs,
    Permissions.RequestMedication,
    Permissions.CompleteMedication,
    Permissions.CancelMedication,
    Permissions.ViewMedications,
    Permissions.ViewMedication,
    Permissions.ViewIncidents,
    Permissions.ViewIncident,
    Permissions.ReportIncident,
    Permissions.ReadVisits,
    Permissions.AddVisit,
    Permissions.RequestImaging,
    Permissions.ViewImagings,
  ]
  const store = mockStore({
    components: { sidebarCollapsed: false },
    user: { permissions: allPermissions },
  } as any)
  const setup = (location: string) => {
    history = createMemoryHistory()
    history.push(location)
    return mount(
      <Router history={history}>
        <Provider store={store}>
          <Sidebar />
        </Provider>
      </Router>,
    )
  }

  const setupNoPermissions = (location: string) => {
    history = createMemoryHistory()
    history.push(location)
    return mount(
      <Router history={history}>
        <Provider
          store={mockStore({
            components: { sidebarCollapsed: false },
            user: { permissions: [] },
          } as any)}
        >
          <Sidebar />
        </Provider>
      </Router>,
    )
  }

  describe('dashboard links', () => {
    it('should render the dashboard link', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(1).text().trim()).toEqual('dashboard.label')
    })

    it('should be active when the current path is /', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(1).prop('active')).toBeTruthy()
    })

    it('should navigate to / when the dashboard link is clicked', () => {
      const wrapper = setup('/patients')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(1).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/')
    })
  })

  describe('patients links', () => {
    it('should render the patients main link', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(2).text().trim()).toEqual('patients.label')
    })

    it('should render the new_patient link', () => {
      const wrapper = setup('/patients')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(3).text().trim()).toEqual('patients.newPatient')
    })

    it('should not render the new_patient link when the user does not have write patient privileges', () => {
      const wrapper = setupNoPermissions('/patients')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('patients.newPatient')
      })
    })

    it('should render the patients_list link', () => {
      const wrapper = setup('/patients')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(4).text().trim()).toEqual('patients.patientsList')
    })

    it('should not render the patients_list link when the user does not have read patient privileges', () => {
      const wrapper = setupNoPermissions('/patients')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('patients.patientsList')
      })
    })

    it('main patients link should be active when the current path is /patients', () => {
      const wrapper = setup('/patients')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(2).prop('active')).toBeTruthy()
    })

    it('should navigate to /patients when the patients main link is clicked', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(2).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/patients')
    })

    it('new patient should be active when the current path is /patients/new', () => {
      const wrapper = setup('/patients/new')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(3).prop('active')).toBeTruthy()
    })

    it('should navigate to /patients/new when the patients new link is clicked', () => {
      const wrapper = setup('/patients')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(3).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/patients/new')
    })

    it('patients list link should be active when the current path is /patients', () => {
      const wrapper = setup('/patients')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(4).prop('active')).toBeTruthy()
    })

    it('should navigate to /patients when the patients list link is clicked', () => {
      const wrapper = setup('/patients')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(4).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/patients')
    })
  })

  describe('appointments link', () => {
    it('should render the scheduling link', () => {
      const wrapper = setup('/appointments')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(3).text().trim()).toEqual('scheduling.label')
    })

    it('should render the new appointment link', () => {
      const wrapper = setup('/appointments/new')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(4).text().trim()).toEqual('scheduling.appointments.new')
    })

    it('should not render the new appointment link when the user does not have write appointments privileges', () => {
      const wrapper = setupNoPermissions('/appointments')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('scheduling.appointments.new')
      })
    })

    it('should render the appointments schedule link', () => {
      const wrapper = setup('/appointments')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(5).text().trim()).toEqual('scheduling.appointments.schedule')
    })

    it('should not render the appointments schedule link when the user does not have read appointments privileges', () => {
      const wrapper = setupNoPermissions('/appointments')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('scheduling.appointments.schedule')
      })
    })

    it('main scheduling link should be active when the current path is /appointments', () => {
      const wrapper = setup('/appointments')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(3).prop('active')).toBeTruthy()
    })

    it('should navigate to /appointments when the main scheduling link is clicked', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(3).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/appointments')
    })

    it('new appointment link should be active when the current path is /appointments/new', () => {
      const wrapper = setup('/appointments/new')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(4).prop('active')).toBeTruthy()
    })

    it('should navigate to /appointments/new when the new appointment link is clicked', () => {
      const wrapper = setup('/appointments')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(4).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/appointments/new')
    })

    it('appointments schedule link should be active when the current path is /appointments', () => {
      const wrapper = setup('/appointments')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(5).prop('active')).toBeTruthy()
    })

    it('should navigate to /appointments when the appointments schedule link is clicked', () => {
      const wrapper = setup('/appointments')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(5).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/appointments')
    })
  })

  describe('labs links', () => {
    it('should render the main labs link', () => {
      const wrapper = setup('/labs')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(4).text().trim()).toEqual('labs.label')
    })

    it('should render the new labs request link', () => {
      const wrapper = setup('/labs')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(5).text().trim()).toEqual('labs.requests.new')
    })

    it('should not render the new labs request link when user does not have request labs privileges', () => {
      const wrapper = setupNoPermissions('/labs')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('labs.requests.new')
      })
    })

    it('should render the labs list link', () => {
      const wrapper = setup('/labs')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(6).text().trim()).toEqual('labs.requests.label')
    })

    it('should not render the labs list link when user does not have view labs privileges', () => {
      const wrapper = setupNoPermissions('/labs')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('labs.requests.label')
      })
    })

    it('main labs link should be active when the current path is /labs', () => {
      const wrapper = setup('/labs')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(4).prop('active')).toBeTruthy()
    })

    it('should navigate to /labs when the main lab link is clicked', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(4).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/labs')
    })

    it('new lab request link should be active when the current path is /labs/new', () => {
      const wrapper = setup('/labs/new')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(5).prop('active')).toBeTruthy()
    })

    it('should navigate to /labs/new when the new labs link is clicked', () => {
      const wrapper = setup('/labs')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(5).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/labs/new')
    })

    it('labs list link should be active when the current path is /labs', () => {
      const wrapper = setup('/labs')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(6).prop('active')).toBeTruthy()
    })

    it('should navigate to /labs when the labs list link is clicked', () => {
      const wrapper = setup('/labs/new')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(6).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/labs')
    })
  })

  describe('incident links', () => {
    it('should render the main incidents link', () => {
      const wrapper = setup('/incidents')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(5).text().trim()).toEqual('incidents.label')
    })

    it('should render the new incident report link', () => {
      const wrapper = setup('/incidents')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(6).text().trim()).toEqual('incidents.reports.new')
    })

    it('should not render the new incident report link when user does not have the report incidents privileges', () => {
      const wrapper = setupNoPermissions('/incidents')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('incidents.reports.new')
      })
    })

    it('should render the incidents list link', () => {
      const wrapper = setup('/incidents')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).text().trim()).toEqual('incidents.reports.label')
    })

    it('should not render the incidents list link when user does not have the view incidents privileges', () => {
      const wrapper = setupNoPermissions('/incidents')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('incidents.reports.label')
      })
    })

    it('main incidents link should be active when the current path is /incidents', () => {
      const wrapper = setup('/incidents')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(5).prop('active')).toBeTruthy()
    })

    it('should navigate to /incidents when the main incident link is clicked', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(5).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/incidents')
    })

    it('new incident report link should be active when the current path is /incidents/new', () => {
      const wrapper = setup('/incidents/new')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(6).prop('active')).toBeTruthy()
    })

    it('should navigate to /incidents/new when the new labs link is clicked', () => {
      const wrapper = setup('/incidents')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(6).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/incidents/new')
    })

    it('incidents list link should be active when the current path is /incidents', () => {
      const wrapper = setup('/incidents')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).prop('active')).toBeTruthy()
    })

    it('should navigate to /labs when the labs list link is clicked', () => {
      const wrapper = setup('/incidents/new')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(7).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/incidents')
    })
  })

  describe('imagings links', () => {
    it('should render the main imagings link', () => {
      const wrapper = setup('/imaging')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).text().trim()).toEqual('imagings.label')
    })

    it('should render the new imaging request link', () => {
      const wrapper = setup('/imagings')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(8).text().trim()).toEqual('imagings.requests.new')
    })

    it('should not render the new imaging request link when user does not have the request imaging privileges', () => {
      const wrapper = setupNoPermissions('/imagings')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('imagings.requests.new')
      })
    })

    it('should render the imagings list link', () => {
      const wrapper = setup('/imagings')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(9).text().trim()).toEqual('imagings.requests.label')
    })

    it('should not render the imagings list link when user does not have the view imagings privileges', () => {
      const wrapper = setupNoPermissions('/imagings')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('imagings.requests.label')
      })
    })

    it('main imagings link should be active when the current path is /imagings', () => {
      const wrapper = setup('/imagings')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).prop('active')).toBeTruthy()
    })

    it('should navigate to /imaging when the main imagings link is clicked', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(7).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/imaging')
    })

    it('new imaging request link should be active when the current path is /imagings/new', () => {
      const wrapper = setup('/imagings/new')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(8).prop('active')).toBeTruthy()
    })

    it('should navigate to /imaging/new when the new imaging link is clicked', () => {
      const wrapper = setup('/imagings')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(8).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/imaging/new')
    })

    it('imagings list link should be active when the current path is /imagings', () => {
      const wrapper = setup('/imagings')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).prop('active')).toBeTruthy()
    })

    it('should navigate to /imaging when the imagings list link is clicked', () => {
      const wrapper = setup('/imagings/new')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(7).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/imaging')
    })
  })

  describe('medications links', () => {
    it('should render the main medications link', () => {
      const wrapper = setup('/medications')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(6).text().trim()).toEqual('medications.label')
    })

    it('should render the new medications request link', () => {
      const wrapper = setup('/medications')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).text().trim()).toEqual('medications.requests.new')
    })

    it('should not render the new medications request link when user does not have request medications privileges', () => {
      const wrapper = setupNoPermissions('/medications')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('medications.requests.new')
      })
    })

    it('should render the medications list link', () => {
      const wrapper = setup('/medications')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).text().trim()).toEqual('medications.requests.new')
    })

    it('should not render the medications list link when user does not have view medications privileges', () => {
      const wrapper = setupNoPermissions('/medications')

      const listItems = wrapper.find(ListItem)

      listItems.forEach((_, i) => {
        expect(listItems.at(i).text().trim()).not.toEqual('medications.requests.new')
      })
    })

    it('main medications link should be active when the current path is /medications', () => {
      const wrapper = setup('/medications')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(6).prop('active')).toBeTruthy()
    })

    it('should navigate to /medications when the main lab link is clicked', () => {
      const wrapper = setup('/')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(6).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/medications')
    })

    it('new lab request link should be active when the current path is /medications/new', () => {
      const wrapper = setup('/medications/new')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(7).prop('active')).toBeTruthy()
    })

    it('should navigate to /medications/new when the new medications link is clicked', () => {
      const wrapper = setup('/medications')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(7).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/medications/new')
    })

    it('medications list link should be active when the current path is /medications', () => {
      const wrapper = setup('/medications')

      const listItems = wrapper.find(ListItem)

      expect(listItems.at(8).prop('active')).toBeTruthy()
    })

    it('should navigate to /medications when the medications list link is clicked', () => {
      const wrapper = setup('/medications/new')

      const listItems = wrapper.find(ListItem)

      act(() => {
        const onClick = listItems.at(8).prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/medications')
    })
  })
})
