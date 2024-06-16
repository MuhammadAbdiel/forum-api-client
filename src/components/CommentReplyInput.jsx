import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

export default function CommentReplyInput({ form, handleReplySubmit }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleReplySubmit)} className='mt-5'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder='Write your reply'
                  {...field}
                  className='w-full border border-gray-300 rounded-md'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-right text-sm text-gray-500 mt-3'>
          {form.watch('content')?.length || 0}/320
        </p>
        <Button type='submit' className='w-full text-white mt-5'>
          Reply Comment
        </Button>
      </form>
    </Form>
  )
}
