import { combineReducers } from "redux"
import auth from "./auth/"
import { user } from "./users/usersReducer"

const rootReducer = combineReducers({
  auth: auth,
  user: user,
})

export default rootReducer
