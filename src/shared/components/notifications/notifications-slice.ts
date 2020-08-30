import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { AppThunk, RootState } from '../../store'

export enum NotificationTypes {
  DEFAULT,
  SUCCESS,
  FAILURE,
  WARNING,
  INFO,
  HIGHLIGHT,
}
export type Notification = {
  id: string
  key: string
  type: NotificationTypes
  message: string
  dismissible?: boolean
  delay?: number
}

type NotificationProps = Omit<Notification, 'key'>
const initialState: Notification[] = []

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify(state, { payload }: PayloadAction<NotificationProps>) {
      const key = uuidv4()
      state.push({ ...payload, key })
      return state
    },
    remove(state, { payload }: PayloadAction<string>) {
      return state.filter((x) => x.key !== payload)
    },
  },
})

export const { notify, remove } = notificationSlice.actions

export const useNotification = (id?: string) => {
  const notifications = useSelector((root: RootState) =>
    id ? root.notifications.filter((x) => x.id === id) : root.notifications,
  )
  return { notifications }
}

export const showNotification = (payload: NotificationProps): AppThunk => async (dispatch) => {
  dispatch(notify(payload))
}

export const removeNotification = (payload: string): AppThunk => async (dispatch) => {
  dispatch(remove(payload))
}

export const notifications = notificationSlice.reducer
