import { ActionType } from './action'

const initialState = {
  repliesByCommentId: {},
}

function repliesReducer(replies = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_REPLIES:
      return {
        ...replies,
        repliesByCommentId: {
          ...replies.repliesByCommentId,
          [action.payload.commentId]: action.payload.replies,
        },
      }
    case ActionType.CLEAR_REPLIES:
      return {
        ...replies,
        repliesByCommentId: {},
      }
    case ActionType.ADD_REPLY:
      const { commentId, reply } = action.payload
      return {
        ...replies,
        repliesByCommentId: {
          ...replies.repliesByCommentId,
          [commentId]: [
            ...(replies.repliesByCommentId[commentId] || []),
            reply,
          ],
        },
      }
    case ActionType.DELETE_REPLY:
      const { replyId, commentId: delCommentId } = action.payload
      return {
        ...replies,
        repliesByCommentId: {
          ...replies.repliesByCommentId,
          [delCommentId]: replies.repliesByCommentId[delCommentId].filter(
            (reply) => reply.id !== replyId,
          ),
        },
      }
    default:
      return replies
  }
}

export default repliesReducer
