import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export default {
    createReview (formData) {
        return Axios.request({
            method: 'POST',
            url: 'api/reviews',
            data: formData,
            headers: authHeader()
        })
    },
    editReviews (formData) {
       return Axios.request({
            method: 'PUT',
            url: '/api/reviews/'+formData._id,
            data: formData,
            headers: authHeader()
        })
    },
    getReviews (formData) {
        return Axios.request({
            method: 'GET',
            url: '/api/reviews/',
            headers: authHeader()
        })
    },
    getReviewById (id) {
        return Axios.request({
            method: 'GET',
            url: '/api/reviews/'+id,
            headers: authHeader()
        })
    },
    deleteReview (id) {
        return Axios.request({
            method: 'DELETE',
            url: '/api/reviews/'+id,
            headers: authHeader()
        })
    }
}