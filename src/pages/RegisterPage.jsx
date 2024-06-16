import { Link, useNavigate } from 'react-router-dom'
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
import RegisterInput from '@/components/RegisterInput'
import { useDispatch } from 'react-redux'
import { asyncRegisterUser } from '@/states/users/action'

const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: 'Fullname is required' })
    .min(5, { message: 'Fullname must be at least 5 characters' })
    .max(100, {
      message: 'Fullname must be less than 100 characters',
    })
    .regex(/^[a-zA-Z\s]+$/, 'Fullname must only contain alphabetic characters'),
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
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, {
      message: 'Password must be less than 50 characters',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@$!%*?&)',
    ),
})

export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [passwordType, setPasswordType] = useState('password')

  function togglePasswordVisibility() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password')
  }

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: '',
      username: '',
      password: '',
    },
  })

  const onRegister = ({ username, password, fullname }) => {
    dispatch(asyncRegisterUser({ username, password, fullname }))

    navigate('/')
    form.reset()
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='mx-auto max-w-sm w-full'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterInput
            form={form}
            passwordType={passwordType}
            togglePasswordVisibility={togglePasswordVisibility}
            onRegister={onRegister}
          />
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
