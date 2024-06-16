import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  REMOVE_AUTH_USER: 'REMOVE_AUTH_USER',
}

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  }
}

function removeAuthUserActionCreator() {
  return {
    type: ActionType.REMOVE_AUTH_USER,
    payload: {
      authUser: null,
    },
  }
}

function asyncSetAuthUser({ username, password }) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const { accessToken } = await api.login({ username, password })
      api.putAccessToken(accessToken)
      const authUser = await api.getOwnProfile()

      dispatch(setAuthUserActionCreator(authUser))
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login Successful',
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

function asyncRemoveAuthUser() {
  return (dispatch) => {
    dispatch(showLoading())

    dispatch(removeAuthUserActionCreator())
    api.putAccessToken('')

    dispatch(hideLoading())
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  removeAuthUserActionCreator,
  asyncSetAuthUser,
  asyncRemoveAuthUser,
}
