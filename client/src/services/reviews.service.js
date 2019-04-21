import Axios from 'axios'
import { authHeader } from '../utils'

export const ReviewsService = {
    createReview (formData) {
        return Axios.post(`/companies/${formData}/reviews`,formData, {headers: authHeader()})
    },
    getReviewsCompanyById (id,page) {
        const query = page? "?page="+page: "";
        return Axios.get(`/companies/${id}/reviews`+query );
    }
}