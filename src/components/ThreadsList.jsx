import ThreadItem from './ThreadItem'
import { CardContent } from './ui/card'
import PropTypes from 'prop-types'

function ThreadsList({ threads }) {
  return (
    <CardContent className='grid gap-8'>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </CardContent>
  )
}

ThreadsList.propTypes = {
  threads: PropTypes.array.isRequired,
}

export default ThreadsList
