import { postedAt } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useContext, useEffect, useMemo, useState } from 'react'
import AuthContext from '@/contexts/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { asyncReceiveReplies } from '@/states/replies/action'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import CommentReplyInput from './CommentReplyInput'
import CommentReplyItem from './CommentReplyItem'
import { makeGetRepliesByCommentId } from '@/states/replies/selector'

const replySchema = z.object({
  content: z
    .string()
    .max(320, { message: 'Reply cannot exceed 320 characters' }),
})

export default function CommentItem({
  threadId,
  comment,
  onDeleteComment,
  onReplyComment,
  commentId,
  onDeleteReply,
}) {
  // Selektor memoized untuk mengambil replies berdasarkan commentId
  const getRepliesByCommentId = useMemo(() => makeGetRepliesByCommentId(), [])
  const replies = useSelector((state) =>
    getRepliesByCommentId(state, commentId),
  )

  const { authUser } = useContext(AuthContext)
  const dispatch = useDispatch()
  const [showReply, setShowReply] = useState(false)

  useEffect(() => {
    dispatch(asyncReceiveReplies(threadId, commentId))
  }, [dispatch, threadId, commentId])

  const form = useForm({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: '',
    },
  })

  const handleReplySubmit = async (data) => {
    await onReplyComment(commentId, data)
    form.reset()
    setShowReply(false)
  }

  return (
    <div className='border-t border-b border-gray-300 mt-4 pb-4 pt-4'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src='' alt='Avatar' />
          <AvatarFallback>
            {comment.fullname.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-semibold'>{comment.fullname}</p>
              <p className='text-gray-500'>@{comment.username}</p>
            </div>
            <p className='text-gray-500'>{postedAt(comment.date)}</p>
          </div>
          <p className='mt-2'>{comment.content}</p>
          {authUser.username === comment.username && (
            <Button
              onClick={() => onDeleteComment(comment.id)}
              className='mt-2 self-end text-white bg-red-500 hover:bg-red-600'
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => setShowReply(!showReply)}
            className='mt-2 self-end text-white bg-blue-500 hover:bg-blue-600'
          >
            Reply
          </Button>
          {showReply && (
            <CommentReplyInput
              form={form}
              handleReplySubmit={handleReplySubmit}
            />
          )}
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div className='ml-10 mt-4'>
          <h1 className='text-xl font-bold mt-10'>Replies</h1>
          {replies.map((reply) => (
            <CommentReplyItem
              key={reply.id}
              reply={reply}
              commentId={commentId}
              onDeleteReply={onDeleteReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}
