import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

function asyncRegisterUser({ username, password, fullname }) {
  return async (dispatch) => {
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
  }
}

export { asyncRegisterUser }
