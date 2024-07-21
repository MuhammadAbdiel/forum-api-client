import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import Swal from 'sweetalert2'

export const asyncReceiveReplies = createAsyncThunk(
  'replies/receive',
  async ({ threadId, commentId }, { dispatch }) => {
    dispatch(clearReplies())
    dispatch(showLoading())

    try {
      const commentDetail = await api.getCommentById(threadId, commentId)
      dispatch(receiveReplies(commentDetail.replies))
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

export const asyncAddReply = createAsyncThunk(
  'replies/add',
  async ({ threadId, commentId, content }, { dispatch }) => {
    dispatch(showLoading())

    try {
      const reply = await api.createReply(threadId, commentId, { content })
      const user = await api.getOwnProfile()

      const response = {
        id: reply.id,
        content: reply.content,
        date: new Date().toISOString(),
        username: user.username,
        fullname: user.fullname,
      }

      dispatch(addReply(response))
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

export const asyncDeleteReply = createAsyncThunk(
  'replies/delete',
  async ({ threadId, commentId, replyId }, { dispatch }) => {
    dispatch(showLoading())

    try {
      await api.deleteReply(threadId, commentId, replyId)
      dispatch(deleteReply(replyId))
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

const repliesSlice = createSlice({
  name: 'replies',
  initialState: [],
  reducers: {
    clearReplies() {
      return []
    },
    receiveReplies(state, action) {
      return action.payload
    },
    addReply(state, action) {
      state.push(action.payload)
    },
    deleteReply(state, action) {
      return state.filter((reply) => reply.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveReplies.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(asyncReceiveReplies.rejected, () => {
        return []
      })
  },
})

export const { clearReplies, receiveReplies, addReply, deleteReply } =
  repliesSlice.actions
export default repliesSlice.reducer
