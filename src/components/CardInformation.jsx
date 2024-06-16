import { MessagesSquare, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function CardInformation() {
  return (
    <div className='grid gap-2 md:grid-cols-1 md:gap-8 lg:grid-cols-2'>
      <Card x-chunk='dashboard-01-chunk-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Thread</CardTitle>
          <MessagesSquare className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>100</div>
        </CardContent>
      </Card>
      <Card x-chunk='dashboard-01-chunk-1'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Users</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>10</div>
        </CardContent>
      </Card>
    </div>
  )
}
