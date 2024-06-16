import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-md text-center'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Page Not Found
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to='/' className='text-blue-600 hover:underline'>
          Go back to Home
        </Link>
      </div>
    </div>
  )
}
