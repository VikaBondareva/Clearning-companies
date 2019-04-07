import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export const ReviewsService = {
    createReview (formData) {
        return Axios.request({
            method: 'POST',
            url: '/reviews',
            data: formData,
            headers: authHeader()
        })
    },
    editReviews (formData) {
       return Axios.request({
            method: 'PUT',
            url: '/reviews/'+formData._id,
            data: formData,
            headers: authHeader()
        })
    },
    getReviews (formData) {
        return Axios.request({
            method: 'GET',
            url: '/reviews',
            headers: authHeader()
        })
    },
    getReviewById (id) {
        return Axios.request({
            method: 'GET',
            url: '/reviews/'+id,
            headers: authHeader()
        })
    },
    getReviewsCompanyById (id,page) {
        const query = page? "?page="+page: "";
        return Axios.request({
            method: 'GET',
            url: `/reviews/${id}`+query
        })
    },
    deleteReview (id) {
        return Axios.request({
            method: 'DELETE',
            url: '/reviews/'+id,
            headers: authHeader()
        })
    }
}