import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export const OrdersService = {
    createOrder (formData) {
        return Axios.request({
            method: 'POST',
            url: '/orders',
            data: formData,
            headers: authHeader()
        })
    },
    changeStatusOrder ({_id, status }) {
       return Axios.request({
            method: 'PUT',
            url: '/orders/'+_id,
            data: status,
            headers: authHeader()
        })
    },
    getOrders(queries) {
        return Axios.request({
            method: 'GET',
            url: '/orders'+queries,
            headers: authHeader()
        })
    },
    getOrderById (id) {
        return Axios.request({
            method: 'GET',
            url: '/orders/'+id,
            headers: authHeader()
        })
    }
}