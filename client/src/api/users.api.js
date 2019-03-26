import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export default {
    getUsers () {
        return Axios.request({
            method: 'GET',
            url: 'api/users',
            headers: authHeader()
        })
    },
    editUser (formData) {
        return Axios.request({
            method: 'PUT',
            url: '/api/users/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    },
    deleteUser (formData) {
        return Axios.request({
            method: 'DELETE',
            url: '/api/users/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    }
}