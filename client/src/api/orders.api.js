import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export default {
    createOrder (formData) {
        return Axios.request({
            method: 'POST',
            url: 'api/orders',
            data: formData,
            headers: authHeader()
        })
    },
    changeStatusOrder ({_id, status }) {
       return Axios.request({
            method: 'PUT',
            url: '/api/orders/'+_id,
            data: status,
            headers: authHeader()
        })
    },
    getOrders (formData) {
        return Axios.request({
            method: 'GET',
            url: '/api/orders/',
            headers: authHeader()
        })
    },
    getOrderById (id) {
        return Axios.request({
            method: 'GET',
            url: '/api/orders/'+id,
            headers: authHeader()
        })
    }
}