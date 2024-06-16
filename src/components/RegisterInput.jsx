import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterInput({
  form,
  passwordType,
  togglePasswordVisibility,
  onRegister,
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)} className='space-y-8 mt-5'>
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  id='fullname'
                  type='text'
                  placeholder='Max Holloway'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  id='username'
                  type='text'
                  placeholder='Username'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                <div className='relative'>
                  <Input
                    id='password'
                    type={passwordType}
                    placeholder='Password'
                    {...field}
                  />
                  <Button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2'
                  >
                    {passwordType === 'password' ? <Eye /> : <EyeOff />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Create an account
        </Button>
      </form>
    </Form>
  )
}
