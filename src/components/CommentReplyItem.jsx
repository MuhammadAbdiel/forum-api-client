import { postedAt } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useContext } from 'react'
import AuthContext from '@/contexts/AuthContext'

export default function CommentReplyItem({ commentId, reply, onDeleteReply }) {
  const { authUser } = useContext(AuthContext)

  return (
    <div className='border-t border-b border-gray-300 mt-4 pb-4 pt-4'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src='' alt='Avatar' />
          <AvatarFallback>
            {reply.fullname.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-semibold'>{reply.fullname}</p>
              <p className='text-gray-500'>@{reply.username}</p>
            </div>
            <p className='text-gray-500'>{postedAt(reply.date)}</p>
          </div>
          <p className='mt-2'>{reply.content}</p>
          {authUser.username === reply.username && (
            <Button
              onClick={() => onDeleteReply(commentId, reply.id)}
              className='mt-2 self-end text-white bg-red-500 hover:bg-red-600'
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
