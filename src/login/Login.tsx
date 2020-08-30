import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input, Button, Form, Card } from 'antd'
import { Store } from 'antd/lib/form/interface'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { NotificationBox } from '../shared/components/notifications/notifications'
import { useNotification } from '../shared/components/notifications/notifications-slice'
// import useTranslator from '../shared/hooks/useTranslator'
import logo from '../shared/static/images/logo-on-transparent.png'
import { RootState } from '../shared/store'
import { login } from '../user/user-slice'

export type LoginFormData = {
  username: string
  password: string
}

const Login = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { notifications } = useNotification('LOGIN_FAILURE')
  // const { t } = useTranslator()
  const { user } = useSelector((root: RootState) => root.user)

  const onSignInSubmit = async (data: Store) => {
    await dispatch(login(data.username, data.password))
  }

  if (user) {
    return <Redirect to="/" />
  }

  return (
    <div className="d-flex align-items-center min-vh-100">
      <div className="container" style={{ width: '40%' }}>
        <img
          src={logo}
          alt="HospitalRun"
          style={{ display: 'block', margin: 'auto', maxHeight: '56px' }}
        />
        <Form form={form} layout="vertical" onFinish={onSignInSubmit}>
          <Card title="Sign In">
            {notifications &&
              notifications.map((notification) => (
                <NotificationBox key={notification.key} notification={notification} />
              ))}
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input id="username" name="username" type="text" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                id="password"
                name="password"
                type="password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Card>
        </Form>
      </div>
    </div>
  )
}

export default Login
