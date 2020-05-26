import { GET_ALL_USERS, GET_ALL_USERS_FAILURE, LOGOUT_USER } from '../types'
import { getUsers } from "../../../services/"


export const getAllUsers = () => {
    return function(dispatch) {
        getUsers().then(res => {
            dispatch({
                type: GET_ALL_USERS,
                users:res
            })
        })
        .catch(err => {
            console.log(err.response);
            dispatch({
                type:LOGOUT_USER
            })
            dispatch({
                type:GET_ALL_USERS_FAILURE
            })
        })
    }
}