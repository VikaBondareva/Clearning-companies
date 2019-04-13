import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export const ReviewsService = {
    createReview (formData) {
        return Axios.post('/reviews',formData, {headers: authHeader()})
    },
    editReviews (formData) {
        return Axios.put('/reviews/'+formData._id,formData,{headers: authHeader()} )
    },
    getReviews () {
        return Axios.get('/reviews', {headers: authHeader()})
    },
    getReviewById (id) {
        return Axios.get( '/reviews/'+id, {headers: authHeader()})
    },
    getReviewsCompanyById (id,page) {
        const query = page? "?page="+page: "";
        return Axios.get(`/reviews/${id}`+query );
    },
    deleteReview (id) {
        return Axios.delete('/reviews/'+id, {headers: authHeader()})
    }
}