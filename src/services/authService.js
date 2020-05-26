
import { getFromLocalStore, saveToLocalStore, deleteFromLocalStore } from '../utils/helpers'
import { parseResponseData, apiInstance, setToHeaders } from "./apiService";

export const login = user => {
    user.pswd = user.password;
    delete user.password
    return apiInstance
        .post('/api/user/login', user)
        .then(parseResponseData)
        .then(res => {
            setToHeaders("Authorization", res.token)
            saveToLocalStore("authToken", res.token)
            saveToLocalStore("userProfile", user.accountId)
            return res;
        })

         
 }


export const logout = () => {
    deleteFromLocalStore("authToken")
}

