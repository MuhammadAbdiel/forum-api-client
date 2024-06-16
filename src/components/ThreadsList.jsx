import ThreadItem from './ThreadItem'
import { CardContent } from './ui/card'

export default function ThreadsList({ threads }) {
  return (
    <CardContent className='grid gap-8'>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </CardContent>
  )
}
