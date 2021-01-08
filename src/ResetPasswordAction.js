import { API_URL, request } from './apiConnection.js';

export default function storeNewPassword(password, user, token) {
    console.log("ACTION");
    return fetch(request(`${API_URL}/store-password`, 'POST', {
        user: user,
        password: password,
        token: token
    })).then(res => res.json())
        .then(result => {
            console.log(result);
            if (result.success) {
                return result;
            } else {
                alert("Link nieważny!");
            }
        }).catch(error => Promise.reject(new Error(error))); //Promise.reject(new Error(error))    
}