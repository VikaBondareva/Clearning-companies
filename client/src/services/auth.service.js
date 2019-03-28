import Axios from 'axios'
import { authRefreshHeader, authHeader } from '../helpers/headers.js'

export default {
    registration(formData) {
        return Axios.request({
            method: 'POST',
            url: '/auth/register',
            data: formData
        })
    },
    authVkonkte(){
        return Axios.request({
            method: 'GET',
            url: '/auth/vkontakte',
        })
    },
    authGoogle(){
        return Axios.request({
            method: 'GET',
            url: '/auth/google',
        })
    },
    authGitHub(){
        return Axios.request({
            method: 'GET',
            url: '/auth/github',
        })
    },
    registrationCompany(formData) {
        return Axios.request({
            method: 'POST',
            url: '/auth/register/company',
            data: formData
        })
    },
    login(formData) {
        return Axios.request({
            method: 'POST',
            url: '/auth/login',
            data: formData
        })
    },
    refreshToken() {
        return Axios.request({
            method: 'POST',
            url: '/auth/refresh-token',
            headers: authRefreshHeader()
        })
    },
    getCurrentUser() {
        return Axios.request({
            method: 'GET',
            url: '/auth/current',
            headers: authHeader()
        })
    },
    logout(){
        return Axios.request({
            method: 'POST',
            url: '/auth/logout',
            headers: authHeader()
        })
    }
}   