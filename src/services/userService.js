

import { parseResponseData, apiInstance, setToHeaders } from "./apiService";

export const getUsers = user => {
    return apiInstance
        .get('/api/users')
        .then(parseResponseData)
        .then(res => {
            return res;
        })
 }



