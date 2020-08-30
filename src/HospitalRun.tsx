import { Toaster } from '@hospitalrun/components'
import { Layout, Typography, Divider } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Dashboard } from './dashboard/Dashboard'
import Imagings from './imagings/Imagings'
import Incidents from './incidents/Incidents'
import Labs from './labs/Labs'
import Medications from './medications/Medications'
import { Breadcrumbs } from './page-header/breadcrumbs/Breadcrumbs'
import { ButtonBarProvider } from './page-header/button-toolbar/ButtonBarProvider'
import ButtonToolBar from './page-header/button-toolbar/ButtonToolBar'
import Patients from './patients/Patients'
import Appointments from './scheduling/appointments/Appointments'
import Settings from './settings/Settings'
import Navbar from './shared/components/navbar/Navbar'
import { NetworkStatusMessage } from './shared/components/network-status'
import Sidebar from './shared/components/sidebar/Sidebar'
import logo from './shared/static/images/hospital-records-logo.png'
import { RootState } from './shared/store'

const { Header, Content, Sider } = Layout

const HospitalRun = () => {
  const { title } = useSelector((state: RootState) => state.title)
  const { user } = useSelector((root: RootState) => root.user)

  if (user === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NetworkStatusMessage />
      <Sider
        width={256}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          zIndex: 2,
          left: 0,
        }}
      >
        <img
          src={logo}
          alt="HospitalRun"
          style={{
            display: 'block',
            marginTop: '16px',
            marginBottom: '16px',
            marginLeft: '24px',
            maxHeight: '32px',
          }}
        />
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Navbar />
        </Header>
        <Content style={{ padding: '16px', marginTop: 64, marginLeft: 256 }}>
          <Typography.Title level={2}>{title}</Typography.Title>
          <ButtonToolBar />
          <Divider />
          <div className="container-fluid">
            <div className="row">
              <ButtonBarProvider>
                <main role="main">
                  <Breadcrumbs />
                  <div>
                    <Switch>
                      <Route exact path="/" component={Dashboard} />
                      <Route path="/appointments" component={Appointments} />
                      <Route path="/patients" component={Patients} />
                      <Route path="/labs" component={Labs} />
                      <Route path="/medications" component={Medications} />
                      <Route path="/incidents" component={Incidents} />
                      <Route path="/settings" component={Settings} />
                      <Route path="/imaging" component={Imagings} />
                    </Switch>
                  </div>
                  <Toaster autoClose={5000} hideProgressBar draggable />
                </main>
              </ButtonBarProvider>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default HospitalRun
