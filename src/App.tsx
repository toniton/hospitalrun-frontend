import { Spin } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HospitalRun from './HospitalRun'
import Login from './login/Login'
import { remoteDb } from './shared/config/pouchdb'
import { getCurrentSession } from './user/user-slice'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const session = await remoteDb.getSession()
        if (session.userCtx.name) {
          await dispatch(getCurrentSession(session.userCtx.name))
        }
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }

    init()
  }, [dispatch])

  if (loading) {
    return null
  }

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spin />}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" component={HospitalRun} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
