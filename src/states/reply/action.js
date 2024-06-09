import api from "@/utils/api";
import Swal from "sweetalert2";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  ADD_REPLY: "ADD_REPLY",
  DELETE_REPLY: "DELETE_REPLY",
};

function addReplyActionCreator(reply) {
  return {
    type: ActionType.ADD_REPLY,
    payload: {
      reply,
    },
  };
}

function deleteReplyActionCreator() {
  return {
    type: ActionType.DELETE_REPLY,
    payload: {
      reply: null,
    },
  };
}

function asyncAddReply(threadId, commentId, { content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const reply = await api.createReply(threadId, commentId, { content });

      dispatch(addReplyActionCreator(reply));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteReply(threadId, commentId, replyId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.deleteReply(threadId, commentId, replyId);

      dispatch(deleteReplyActionCreator());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  addReplyActionCreator,
  deleteReplyActionCreator,
  asyncAddReply,
  asyncDeleteReply,
};
