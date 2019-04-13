import Axios from 'axios'
import { authRefreshHeader, authHeader } from '../helpers'

export const AuthService = {
    registration(formData) {
        return Axios.post('/auth/register',formData )
    },
    authVkonkte(){
        return Axios.post('/auth/vkontakte')
    },
    confirmEmail(token, email){
        return Axios.post(`/auth/activation`,{email}, { headers: {'Authorization': 'Bearer ' + token}} )
    },
    authGoogle(){
        return Axios.post('/auth/google')
    },
    authGitHub(){
        return Axios.post('/auth/github')
    },
    registrationCompany(formData) {
        return Axios.post('/auth/register/company',formData )
    },
    login(formData) {
        return Axios.post('/auth/login',formData )
    },
    refreshToken() {
        return Axios.post( '/auth/refresh-token',{headers: authRefreshHeader()} )
    },
    getCurrentUser() {
        return Axios.get('/auth/current', {headers: authHeader()})
    },
    logout(){
        return Axios.post('/auth/logout',{headers: authRefreshHeader()} )
    }
}   