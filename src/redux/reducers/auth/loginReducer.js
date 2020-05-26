import { LOGIN_SUCCESS , LOGOUT_USER, LOGIN_FAILURE, } from '../../actions/types';
import { getFromLocalStore } from '../../../utils/helpers/localStorage'

//Initial state
const initialState = {
  error:{},
  isAuthenticated:false,
  user:{}
}


let token = getFromLocalStore("authToken");
if(token) {
    initialState.isAuthenticated = true;
}

let profile = getFromLocalStore("userProfile");
if(profile) {
  initialState.user = profile;
}



//Below handler is resposible for login Auth
export const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { 
        ...state,
        isAuthenticated:true,
        user:action.user.accountId
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errors:action.errors
      };
    case LOGOUT_USER:
      return { 
        ...state,
        isAuthenticated:false,
        errors:{}
      };
    default:
      return state
  }
}
