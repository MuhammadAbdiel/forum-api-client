import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { setAuthUser } from '../authUser/slice'

export const asyncPreloadProcess = createAsyncThunk(
  'isPreload/preload',
  async (_, { dispatch }) => {
    dispatch(showLoading())

    try {
      const authUser = await api.getOwnProfile()
      dispatch(setAuthUser(authUser))
    } catch (error) {
      dispatch(setAuthUser(null))
    } finally {
      dispatch(setIsPreload(false))

      dispatch(hideLoading())
    }
  },
)

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload: (state, action) => action.payload,
  },
})

export const { setIsPreload } = isPreloadSlice.actions
export default isPreloadSlice.reducer
