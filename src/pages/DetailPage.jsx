import { Button } from '@/components/ui/button'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncReceiveThreadDetail } from '@/states/threadDetail/slice'
import { useEffect } from 'react'
import ThreadDetail from '@/components/ThreadDetail'
import Swal from 'sweetalert2'
import { asyncAddReply, asyncDeleteReply } from '@/states/replies/slice'
import {
  asyncAddComment,
  asyncDeleteComment,
  asyncReceiveComments,
} from '@/states/comments/slice'

export default function DetailPage() {
  const { id } = useParams()
  const threadDetail = useSelector((state) => state.threadDetail)
  const comments = useSelector((state) => state.comments)
  const replies = useSelector((state) => state.replies)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
    dispatch(asyncReceiveComments(id))
  }, [id, dispatch, replies])

  const onCommentThread = ({ content }) => {
    // dispatch(asyncAddComment(id, { content }))
    dispatch(asyncAddComment({ threadId: id, content }))
  }

  const onDeleteComment = (commentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Deleted Successful',
          icon: 'success',
        })

        // dispatch(asyncDeleteComment(id, commentId))
        dispatch(asyncDeleteComment({ threadId: id, commentId }))
      }
    })
  }

  const onReplyComment = (commentId, { content }) => {
    // dispatch(asyncAddReply(id, commentId, { content }))
    dispatch(asyncAddReply({ threadId: id, commentId, content }))
  }

  const onDeleteReply = (commentId, replyId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Deleted Successful',
          icon: 'success',
        })

        // dispatch(asyncDeleteReply(id, commentId, replyId))
        dispatch(asyncDeleteReply({ threadId: id, commentId, replyId }))
      }
    })
  }

  if (!threadDetail) {
    return null
  }

  return (
    <div className='container mx-auto lg:px-36 md:px-8 flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-8'>
      <Link to='/'>
        <Button>Back to Home</Button>
      </Link>
      <ThreadDetail
        // threadId={id}
        threadDetail={threadDetail}
        onCommentThread={onCommentThread}
        comments={comments}
        onDeleteComment={onDeleteComment}
        onReplyComment={onReplyComment}
        onDeleteReply={onDeleteReply}
      />
    </div>
  )
}
