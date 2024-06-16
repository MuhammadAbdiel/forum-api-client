import { configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import isPreloadReducer from './isPreload/reducer'
import authUserReducer from './authUser/reducer'
import threadsReducer from './threads/reducer'
import threadDetailReducer from './threadDetail/reducer'
import commentsReducer from './comments/reducer'
import repliesReducer from './replies/reducer'

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    comments: commentsReducer,
    replies: repliesReducer,
  },
})

export default store
