import { ActionType } from './action'

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_COMMENTS:
      return action.payload.comments
    case ActionType.CLEAR_COMMENTS:
      return []
    case ActionType.ADD_COMMENT:
      return [...comments, action.payload.comment]
    case ActionType.DELETE_COMMENT:
      return comments.filter(
        (comment) => comment.id !== action.payload.commentId,
      )
    default:
      return comments
  }
}

export default commentsReducer
