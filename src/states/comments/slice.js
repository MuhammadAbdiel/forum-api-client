import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import Swal from 'sweetalert2'

export const asyncReceiveComments = createAsyncThunk(
  'comments/receive',
  async (threadId, { dispatch }) => {
    dispatch(clearComments())
    dispatch(showLoading())

    try {
      const threadDetail = await api.getThreadById(threadId)

      dispatch(receiveComments(threadDetail.comments))
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

export const asyncAddComment = createAsyncThunk(
  'comments/add',
  async ({ threadId, content }, { dispatch }) => {
    dispatch(showLoading())

    try {
      const comment = await api.createComment(threadId, { content })
      const user = await api.getOwnProfile()

      const response = {
        id: comment.id,
        content: comment.content,
        date: new Date().toISOString(),
        username: user.username,
        fullname: user.fullname,
        replies: [],
      }

      dispatch(addComment(response))
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

export const asyncDeleteComment = createAsyncThunk(
  'comments/delete',
  async ({ threadId, commentId }, { dispatch }) => {
    dispatch(showLoading())

    try {
      await api.deleteComment(threadId, commentId)

      dispatch(deleteComment(commentId))
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    receiveComments: (state, action) => {
      return action.payload
    },
    clearComments: () => {
      return []
    },
    addComment: (state, action) => {
      state.push(action.payload)
    },
    deleteComment: (state, action) => {
      return state.filter((comment) => comment.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveComments.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(asyncReceiveComments.rejected, () => {
        return []
      })
  },
})

export const { receiveComments, clearComments, addComment, deleteComment } =
  commentsSlice.actions
export default commentsSlice.reducer
