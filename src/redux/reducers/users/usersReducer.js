import { GET_ALL_USERS, GET_ALL_USERS_FAILURE } from '../../actions/types'

//Initial state
const initialState = {
  users:[],
}



//Below handler is resposible for login Auth
export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { 
        ...state,
        users:action.users,
        error:{}
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        users:[]
      };
    default:
      return state
  }
}
