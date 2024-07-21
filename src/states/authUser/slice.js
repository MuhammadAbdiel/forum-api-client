import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import Swal from 'sweetalert2'

export const asyncSetAuthUser = createAsyncThunk(
  'authUser/set',
  async ({ username, password }, { dispatch }) => {
    dispatch(showLoading())

    try {
      const { accessToken } = await api.login({ username, password })
      api.putAccessToken(accessToken)
      const authUser = await api.getOwnProfile()

      dispatch(setAuthUser(authUser))
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login Successful',
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  },
)

export const asyncRemoveAuthUser = createAsyncThunk(
  'authUser/remove',
  async (_, { dispatch }) => {
    dispatch(showLoading())

    dispatch(removeAuthUser())
    api.putAccessToken('')

    dispatch(hideLoading())
  },
)

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => action.payload,
    removeAuthUser: () => null,
  },
})

export const { setAuthUser, removeAuthUser } = authUserSlice.actions
export default authUserSlice.reducer
