import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import Swal from 'sweetalert2'

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threads/detail',
  async (threadId, { dispatch }) => {
    dispatch(clearThreadDetail())
    dispatch(showLoading())

    try {
      const threadDetail = await api.getThreadById(threadId)

      const response = {
        ...threadDetail,
      }

      dispatch(receiveThreadDetail(response))
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

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail(state, action) {
      return action.payload
    },
    clearThreadDetail() {
      return null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(asyncReceiveThreadDetail.rejected, () => {
        return null
      })
  },
})

export const { receiveThreadDetail, clearThreadDetail } =
  threadDetailSlice.actions
export default threadDetailSlice.reducer
