import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import Swal from 'sweetalert2'

export const asyncReceiveThreads = createAsyncThunk(
  'threads/receive',
  async (_, { dispatch }) => {
    dispatch(showLoading())

    try {
      const threads = await api.getAllThread()
      dispatch(receiveThreads(threads))
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

export const asyncAddThread = createAsyncThunk(
  'threads/add',
  async ({ title, body }, { dispatch }) => {
    dispatch(showLoading())

    try {
      const thread = await api.createThread({ title, body })
      const user = await api.getOwnProfile()

      const response = {
        id: thread.id,
        title: thread.title,
        body,
        date: new Date().toISOString(),
        user: {
          username: user.username,
          fullname: user.fullname,
        },
      }

      dispatch(addThread(response))
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Create Thread Successful',
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

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads(state, action) {
      return action.payload
    },
    addThread(state, action) {
      state.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreads.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(asyncReceiveThreads.rejected, () => {
        return []
      })
  },
})

export const { receiveThreads, addThread } = threadsSlice.actions
export default threadsSlice.reducer
