import { LOGIN_SUCCESS , LOGIN_FAILURE, LOGOUT_USER } from '../types';
import { login, logout } from '../../../services'

export const loginHandler = (user) => {
  return function (dispatch) {
    login(user)
    .then(response => {
      if(response.error_message) {
        dispatch({
            type:LOGIN_FAILURE,
            errors:response.error_message
        })
      } else {
        dispatch({
            type:LOGIN_SUCCESS,
            user:user,
        })
      }

    })
    .catch(err => {
      dispatch({
          type:LOGIN_FAILURE,
          errors:err.response
      })
    })
  }
}

export const logoutUser = () => {
  return function(dispatch) {
    logout();
    dispatch({
      type:LOGOUT_USER
    })
  }
}
