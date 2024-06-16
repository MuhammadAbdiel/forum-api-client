import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncSetAuthUser } from '@/states/authUser/action'
import LoginInput from '@/components/LoginInput'

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(50, {
      message: 'Username must be less than 50 characters',
    }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
})

export default function LoginPage() {
  const dispatch = useDispatch()

  const [passwordType, setPasswordType] = useState('password')

  function togglePasswordVisibility() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password')
  }

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onLogin = ({ username, password }) => {
    dispatch(asyncSetAuthUser({ username, password }))
    form.reset()
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='mx-auto max-w-sm w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign In</CardTitle>
          <CardDescription>
            Enter your account below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginInput
            form={form}
            passwordType={passwordType}
            togglePasswordVisibility={togglePasswordVisibility}
            onLogin={onLogin}
          />
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/register' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
