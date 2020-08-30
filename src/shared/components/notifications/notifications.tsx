import { Alert } from 'antd'
import React, { useState, useEffect, memo, useCallback, useRef, MutableRefObject } from 'react'
import { useDispatch } from 'react-redux'

import useTranslator from '../../hooks/useTranslator'
import { Notification, NotificationTypes, removeNotification } from './notifications-slice'

interface Props {
  notification: Notification
}

type AlertColorTypes = 'success' | 'info' | 'warning' | 'error' | undefined

export const NotificationBox = memo((props: Props) => {
  const dispatch = useDispatch()
  const { t } = useTranslator()
  const [visible, setVisible] = useState(true)
  const { notification } = props
  const { type, message, dismissible = false, delay = 0 } = notification
  const color =
    {
      [NotificationTypes.SUCCESS]: 'success',
      [NotificationTypes.INFO]: 'info',
      [NotificationTypes.HIGHLIGHT]: 'info',
      [NotificationTypes.WARNING]: 'warning',
      [NotificationTypes.FAILURE]: 'error',
      [NotificationTypes.DEFAULT]: 'info',
    }[type] || 'info'

  const timer: MutableRefObject<NodeJS.Timeout | null> = useRef(null)

  const setTimer = useCallback(() => {
    if (timer.current != null) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      setVisible(false)
      dispatch(removeNotification(notification.key))
      timer.current = null
    }, delay)
  }, [delay, dispatch, notification])

  useEffect(() => {
    if (delay !== 0) {
      setTimer()
    }
  }, [delay, setTimer])

  return visible ? (
    <Alert type={color as AlertColorTypes} message={t(message)} closable={dismissible} />
  ) : null
})
