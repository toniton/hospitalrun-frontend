import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  showNotification,
  NotificationTypes,
} from '../shared/components/notifications/notifications-slice'
import { remoteDb } from '../shared/config/pouchdb'
import { Permissions } from '../shared/model/Permissions'
import User from '../shared/model/User'
import { AppThunk } from '../shared/store'

interface LoginError {
  message?: string
  username?: string
  password?: string
}

interface UserState {
  permissions: (Permissions | null)[]
  user?: User
  loginError?: LoginError
}

const initialState: UserState = {
  permissions: [
    Permissions.ReadPatients,
    Permissions.WritePatients,
    Permissions.ReadAppointments,
    Permissions.WriteAppointments,
    Permissions.DeleteAppointment,
    Permissions.AddAllergy,
    Permissions.AddDiagnosis,
    Permissions.ViewLabs,
    Permissions.ViewLab,
    Permissions.RequestLab,
    Permissions.CompleteLab,
    Permissions.CancelLab,
    Permissions.ViewIncident,
    Permissions.ViewIncidents,
    Permissions.ReportIncident,
    Permissions.ResolveIncident,
    Permissions.AddCarePlan,
    Permissions.ReadCarePlan,
    Permissions.RequestMedication,
    Permissions.CompleteMedication,
    Permissions.CancelMedication,
    Permissions.ViewMedications,
    Permissions.ViewMedication,
    Permissions.AddVisit,
    Permissions.ReadVisits,
    Permissions.ViewImagings,
    Permissions.RequestImaging,
  ],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchPermissions(state, { payload }: PayloadAction<Permissions[]>) {
      state.permissions = payload
    },
    loginSuccess(
      state,
      { payload }: PayloadAction<{ user: User; permissions: (Permissions | null)[] }>,
    ) {
      state.user = payload.user
      state.permissions = initialState.permissions
    },
    loginError(state, { payload }: PayloadAction<LoginError>) {
      state.loginError = payload
    },
    logoutSuccess(state) {
      state.user = undefined
      state.permissions = []
    },
  },
})

export const { fetchPermissions, loginError, loginSuccess, logoutSuccess } = userSlice.actions

type AuthUser = PouchDB.Authentication.User &
  PouchDB.Authentication.PutUserOptions &
  PouchDB.Core.IdMeta &
  PouchDB.Core.GetMeta
export const getCurrentSession = (username: string): AppThunk => async (dispatch) => {
  const user: AuthUser = await remoteDb.getUser(username)
  const {
    _id: id,
    metadata: { givenName, familyName },
  } = user

  dispatch(
    loginSuccess({
      user: {
        id,
        givenName,
        familyName,
      },
      permissions: initialState.permissions,
    }),
  )
}

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
  try {
    const response = await remoteDb.logIn(username, password)
    dispatch(getCurrentSession(response.name))
  } catch (error) {
    dispatch(
      showNotification({
        id: 'LOGIN_FAILURE',
        message: 'user.login.error.message.required',
        type: NotificationTypes.FAILURE,
        delay: 3000,
      }),
    )
    if (!username || !password) {
      dispatch(
        loginError({
          message: 'user.login.error.message.required',
          username: 'user.login.error.username.required',
          password: 'user.login.error.password.required',
        }),
      )
    } else if (error.status === 401) {
      dispatch(
        loginError({
          message: 'user.login.error.message.incorrect',
        }),
      )
    }
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  await remoteDb.logOut()
  dispatch(logoutSuccess())
}

export default userSlice.reducer
