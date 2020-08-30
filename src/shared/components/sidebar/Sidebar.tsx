import { Menu } from 'antd'
import React, { useCallback, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import useTranslator from '../../hooks/useTranslator'
import { Permissions } from '../../model/Permissions'
import { RootState } from '../../store'
import { pageMap, getPageMapByPath } from '../../util/page-map'

const { SubMenu } = Menu

const Sidebar = () => {
  const permissions = useSelector((state: RootState) => state.user.permissions)

  const { t } = useTranslator()
  const history = useHistory()
  const location = useLocation()
  const selected = useRef('dashboard')

  useEffect(() => {
    selected.current = getPageMapByPath(location.pathname) || ''
  }, [location])

  const navigateTo = useCallback(
    (url: string) => {
      history.push(url)
    },
    [history],
  )

  const handleClick = (e: any) => {
    selected.current = e.key
    navigateTo(pageMap.get(e.key)?.path || '/')
  }

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={['dashboard']}
      selectedKeys={[selected.current]}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <Menu.Item key="dashboard">{t('dashboard.label')}</Menu.Item>
      <Menu.ItemGroup key="general:out:patients" title="General Out Patients">
        <SubMenu key="patient" title={t('patients.label')}>
          {permissions.includes(Permissions.WritePatients) && (
            <Menu.Item key="patient:new">{t('patients.newPatient')}</Menu.Item>
          )}
          <Menu.Item key="patient:search">{t('patients.patientsList')}</Menu.Item>
        </SubMenu>
        <SubMenu key="appointment" title={t('scheduling.label')}>
          {permissions.includes(Permissions.WriteAppointments) && (
            <Menu.Item key="appointment:new">{t('scheduling.appointments.new')}</Menu.Item>
          )}
          {permissions.includes(Permissions.ReadAppointments) && (
            <Menu.Item key="appointment:search">{t('scheduling.appointments.schedule')}</Menu.Item>
          )}
        </SubMenu>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="labs:meds" title="Labs & Meds">
        <SubMenu key="lab" title={t('labs.label')}>
          {permissions.includes(Permissions.RequestLab) && (
            <Menu.Item key="lab:new">{t('labs.requests.new')}</Menu.Item>
          )}
          {permissions.includes(Permissions.ViewLabs) && (
            <Menu.Item key="lab:search">{t('labs.requests.label')}</Menu.Item>
          )}
        </SubMenu>
        <SubMenu key="medications" title={t('medications.label')}>
          {permissions.includes(Permissions.RequestMedication) && (
            <Menu.Item key="medication:new">{t('medications.requests.new')}</Menu.Item>
          )}
          {permissions.includes(Permissions.ViewMedications) && (
            <Menu.Item key="medication:search">{t('medications.requests.label')}</Menu.Item>
          )}
        </SubMenu>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="reports" title="Reports">
        <SubMenu key="incident" title={t('labs.label')}>
          {permissions.includes(Permissions.ReportIncident) && (
            <Menu.Item key="incident:new">{t('incidents.reports.new')}</Menu.Item>
          )}
          {permissions.includes(Permissions.ViewIncidents) && (
            <Menu.Item key="incident:search">{t('incidents.reports.label')}</Menu.Item>
          )}
        </SubMenu>
        <SubMenu key="imaging" title={t('imagings.label')}>
          {permissions.includes(Permissions.RequestImaging) && (
            <Menu.Item key="imaging:new">{t('imagings.requests.new')}</Menu.Item>
          )}
          {permissions.includes(Permissions.ViewImagings) && (
            <Menu.Item key="imaging:search">{t('imagings.requests.label')}</Menu.Item>
          )}
        </SubMenu>
      </Menu.ItemGroup>
    </Menu>
  )
}

export default Sidebar
