import { Menu, Avatar, Dropdown } from 'antd'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useTranslator from '../../hooks/useTranslator'
import { RootState } from '../../store'
import { pageMap } from '../../util/page-map'

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user)
  const history = useHistory()
  const { t } = useTranslator()

  const navigateTo = useCallback(
    (location: string) => {
      history.push(location)
    },
    [history],
  )

  const handleClick = (e: any) => {
    navigateTo(pageMap.get(e.key)?.path || '/')
  }

  const menu = (
    <Menu onClick={handleClick} style={{ width: 256 }} mode="inline">
      <Menu.ItemGroup key="loggedin:username" title={`${user?.givenName} ${user?.familyName}`}>
        <Menu.Item key="user:settings">{t('settings.label')}</Menu.Item>
        <Menu.Item key="user:logout">{t('actions.logout')}</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  )

  return (
    <div
      style={{
        justifyContent: 'flex-end',
        display: 'flex',
      }}
    >
      <div>
        <Dropdown overlay={menu}>
          <Avatar>{`${user?.givenName?.charAt(0) || '#'}`}</Avatar>
        </Dropdown>
      </div>
    </div>
  )
}
export default Navbar
