import { createSelector } from 'reselect'

// Selektor dasar untuk mengambil state replies
const getRepliesState = (state) => state.replies.repliesByCommentId

// Selektor memoized untuk mengambil replies berdasarkan commentId
export const makeGetRepliesByCommentId = () =>
  createSelector(
    [getRepliesState, (state, commentId) => commentId],
    (repliesByCommentId, commentId) => repliesByCommentId[commentId] || [],
  )
