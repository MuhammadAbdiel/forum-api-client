import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import isPreloadReducer from "./isPreload/reducer";
import authUserReducer from "./authUser/reducer";
import threadsReducer from "./threads/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import commentReducer from "./comment/reducer";
import replyReducer from "./reply/reducer";

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    comment: commentReducer,
    reply: replyReducer,
  },
});

export default store;
