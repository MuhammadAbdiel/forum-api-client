import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  CLEAR_COMMENTS: 'CLEAR_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
}

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  }
}

function clearCommentsActionCreator() {
  return {
    type: ActionType.CLEAR_COMMENTS,
  }
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  }
}

function deleteCommentActionCreator(commentId) {
  return {
    type: ActionType.DELETE_COMMENT,
    payload: {
      commentId,
    },
  }
}

function asyncReceiveComments(threadId) {
  return async (dispatch) => {
    dispatch(clearCommentsActionCreator())
    dispatch(showLoading())

    try {
      const threadDetail = await api.getThreadById(threadId)

      dispatch(receiveCommentsActionCreator(threadDetail.comments))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncAddComment(threadId, { content }) {
  return async (dispatch) => {
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

      dispatch(addCommentActionCreator(response))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncDeleteComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      await api.deleteComment(threadId, commentId)

      dispatch(deleteCommentActionCreator(commentId))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  }
}

export {
  ActionType,
  asyncReceiveComments,
  clearCommentsActionCreator,
  addCommentActionCreator,
  deleteCommentActionCreator,
  receiveCommentsActionCreator,
  asyncAddComment,
  asyncDeleteComment,
}
