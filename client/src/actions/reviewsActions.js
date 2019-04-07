import {
    REVIEWS_LIST_LOAD_REQUEST,
    REVIEWS_LIST_LOADED_SUCCESS,
    REVIEWS_LIST_LOADED_ERROR
} from './actionTypes';
import {ReviewsService} from '../services';

export const loadReviewsRequest = () => ({
    type: REVIEWS_LIST_LOAD_REQUEST
})

export const loadedReviewsListSuccess = ({docs,total, page, pages}) => ({
    type: REVIEWS_LIST_LOADED_SUCCESS,
    payload: {
        docs,
        total, 
        page, 
        pages
    }
})

export const loadedReviewsListError = () => ({
    type: REVIEWS_LIST_LOADED_ERROR
})

export const asyncGetReviews = (id,page =1 ) => dispatch => {
    dispatch(loadReviewsRequest());
    return ReviewsService.getReviewsCompanyById(id,page)
        .then(response => {
            console.log(response);
            dispatch(loadedReviewsListSuccess(response.data));
        })
        .catch(()=>{
            dispatch(loadedReviewsListError());
        })
}
