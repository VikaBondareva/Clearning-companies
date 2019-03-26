import Axios from 'axios'
import { authRefreshHeader, authHeader } from '../helpers/headers.js'

export default {
    registration(formData) {
        return Axios.request({
            method: 'POST',
            url: 'api/auth/register',
            data: formData
        })
    },
    registrationCompany(formData) {
        return Axios.request({
            method: 'POST',
            url: 'api/auth/register/company',
            data: formData
        })
    },
    login(formData) {
        return Axios.request({
            method: 'POST',
            url: 'api/auth/login',
            data: formData
        })
    },
    refreshToken() {
        return Axios.request({
            method: 'POST',
            url: '/api/auth/refresh-token',
            headers: authRefreshHeader()
        })
    },
    getCurrentUser() {
        return Axios.request({
            method: 'GET',
            url: '/api/auth/current',
            headers: authHeader()
        })
    },
    logout(){
        return Axios.request({
            method: 'POST',
            url: '/api/auth/logout',
            headers: authHeader()
        })
    }
}   