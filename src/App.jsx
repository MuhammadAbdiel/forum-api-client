import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncRemoveAuthUser } from './states/authUser/action'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Loading from './components/Loading'
import AuthContext from './contexts/AuthContext'
import Swal from 'sweetalert2'
import DetailPage from './pages/DetailPage'

export default function App() {
  const authUser = useSelector((state) => state.authUser)
  const isPreload = useSelector((state) => state.isPreload)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  const onLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: 'Logged Out Successful',
          icon: 'success',
        })

        dispatch(asyncRemoveAuthUser())
      }
    })
  }

  if (isPreload) {
    return null
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/*' element={<Navigate to='/' />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    )
  }

  return (
    <AuthContext.Provider value={{ authUser, onLogout }}>
      <Loading />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/threads/:id' element={<DetailPage />} />
          <Route path='/login' element={<Navigate to='/' />} />
          <Route path='/register' element={<Navigate to='/' />} />
          <Route path='/404' element={<NotFoundPage />} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </main>
    </AuthContext.Provider>
  )
}
