import api from '@/utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import Swal from 'sweetalert2'

export const asyncRegisterUser = createAsyncThunk(
  'users/register',
  async ({ username, password, fullname }, { dispatch }) => {
    dispatch(showLoading())

    try {
      await api.register({ username, password, fullname })
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Register Successful',
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  },
)
