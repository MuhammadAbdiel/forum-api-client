import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '../components/Navbar'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncAddThread, asyncReceiveThreads } from '@/states/threads/action'
import CreateThreadForm from '@/components/CreateThreadForm'
import ThreadsList from '@/components/ThreadsList'
import { useSearchParams } from 'react-router-dom'

const createThreadSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
  body: z
    .string()
    .min(1, { message: 'Body is required' })
    .min(20, { message: 'Body must be at least 20 characters' }),
})

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || ''
  })
  const threads = useSelector((state) => state.threads)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreads())
  }, [dispatch])

  const form = useForm({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  })

  const onCreate = ({ title, body }) => {
    dispatch(asyncAddThread({ title, body }))
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword)
    setSearchParams({ keyword })
  }

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(keyword.toLowerCase()),
  )

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar
        keyword={keyword}
        onKeywordChangeHandler={onKeywordChangeHandler}
      />
      <main className='container mx-auto lg:px-36 md:px-8 flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-8'>
        <div className='grid'>
          <Card x-chunk='dashboard-01-chunk-5'>
            <CardHeader>
              <CardTitle>Threads</CardTitle>
            </CardHeader>
            <ThreadsList threads={filteredThreads} />
          </Card>
        </div>
        <CreateThreadForm form={form} onCreate={onCreate} />
      </main>
    </div>
  )
}
