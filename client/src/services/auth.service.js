import Axios from 'axios'
import { authRefreshHeader, authHeader, roles } from '../utils'

export const AuthService = {
    registration(formData, role) {
        if(role === roles.user) {
            return Axios.post('/auth/register',formData )
        } else if (role === roles.executor) {
            return Axios.post('/auth/register/company',formData )
        }
    },
    confirmEmail({token, email, verificationCode}, role){
        if(role === roles.user) {
            return Axios.put(`/auth/confirm/code`,{email,verificationCode});
        } else if (role === roles.executor) {
            return Axios.post(`/auth/confirm/email`,{ headers: {'Authorization': 'Bearer ' + token}});
        }
    },
    createNewCode(email){
        return Axios.post('/auth/confirm', {email});
    },
    changeEmail(){
        return Axios.put('/auth/confirm', {headers: authRefreshHeader()})
    },
    authVkonkte(){
        return Axios.post('/auth/vkontakte')
    },
    authGoogle(){
        return Axios.post('/auth/google')
    },
    authGitHub(){
        return Axios.post('/auth/github')
    },
    // registrationCompany(formData) {
    //     return Axios.post('/auth/register/company',formData )
    // },
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