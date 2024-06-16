import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  RECEIVE_REPLIES: 'RECEIVE_REPLIES',
  CLEAR_REPLIES: 'CLEAR_REPLIES',
  ADD_REPLY: 'ADD_REPLY',
  DELETE_REPLY: 'DELETE_REPLY',
}

function receiveRepliesActionCreator(replies) {
  return {
    type: ActionType.RECEIVE_REPLIES,
    payload: {
      replies,
    },
  }
}

function clearRepliesActionCreator() {
  return {
    type: ActionType.CLEAR_REPLIES,
  }
}

function addReplyActionCreator(reply) {
  return {
    type: ActionType.ADD_REPLY,
    payload: {
      reply,
    },
  }
}

function deleteReplyActionCreator(replyId) {
  return {
    type: ActionType.DELETE_REPLY,
    payload: {
      replyId,
    },
  }
}

function asyncReceiveReplies(threadId, commentId) {
  return async (dispatch) => {
    dispatch(clearRepliesActionCreator())
    dispatch(showLoading())

    try {
      const commentDetail = await api.getCommentById(threadId, commentId)

      dispatch(receiveRepliesActionCreator(commentDetail.replies))
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

function asyncClearReplies() {
  return async (dispatch) => {
    dispatch(clearRepliesActionCreator())
  }
}

function asyncAddReply(threadId, commentId, { content }) {
  return async (dispatch) => {
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

      dispatch(addReplyActionCreator(response))
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

function asyncDeleteReply(threadId, commentId, replyId) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      await api.deleteReply(threadId, commentId, replyId)

      dispatch(deleteReplyActionCreator(replyId))
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
  receiveRepliesActionCreator,
  clearRepliesActionCreator,
  addReplyActionCreator,
  asyncClearReplies,
  deleteReplyActionCreator,
  asyncReceiveReplies,
  asyncAddReply,
  asyncDeleteReply,
}
