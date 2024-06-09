import { ActionType } from "./action";

function replyReducer(reply = null, action = {}) {
  switch (action.type) {
    case ActionType.ADD_REPLY:
      return action.payload.reply;
    case ActionType.DELETE_REPLY:
      return action.payload.reply;
    default:
      return reply;
  }
}

export default replyReducer;
