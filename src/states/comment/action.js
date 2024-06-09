import api from "@/utils/api";
import Swal from "sweetalert2";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
};

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function deleteCommentActionCreator() {
  return {
    type: ActionType.DELETE_COMMENT,
    payload: {
      comment: null,
    },
  };
}

function asyncAddComment(threadId, { content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment(threadId, { content });

      dispatch(addCommentActionCreator(comment));
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

function asyncDeleteComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.deleteComment(threadId, commentId);

      dispatch(deleteCommentActionCreator());
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
  addCommentActionCreator,
  deleteCommentActionCreator,
  asyncAddComment,
  asyncDeleteComment,
};
