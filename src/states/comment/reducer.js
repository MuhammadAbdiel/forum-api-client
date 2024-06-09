import { ActionType } from "./action";

function commentReducer(comment = null, action = {}) {
  switch (action.type) {
    case ActionType.ADD_COMMENT:
      return action.payload.comment;
    case ActionType.DELETE_COMMENT:
      return action.payload.comment;
    default:
      return comment;
  }
}

export default commentReducer;
