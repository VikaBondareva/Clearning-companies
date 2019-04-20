import {
    REVIEWS_LIST_LOAD_REQUEST,
    REVIEWS_LIST_LOADED_SUCCESS,
    REVIEWS_LIST_LOADED_ERROR,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATED_SUCCESS,
    REVIEW_CREATED_ERROR
} from './actionTypes';
import {ReviewsService} from '../services';
import {returnErrors} from './errorActions';

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

export const createReviewRequest = () => ({
    type: REVIEW_CREATE_REQUEST
})

export const createdReviewSuccess = () => ({
    type: REVIEW_CREATED_SUCCESS,
})

export const createdReviewError = () => ({
    type: REVIEW_CREATED_ERROR
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


export const asyncCreateReview = ({ratting, reviewText, company, user}) => dispatch => {
    dispatch(createReviewRequest());
    return ReviewsService.createReview({ratting, reviewText, company, user})
        .then(response => {
            console.log(response);
            dispatch(createdReviewSuccess());
            dispatch(asyncGetReviews(company));
        })
        .catch((error)=> {
            dispatch(createdReviewError());
            dispatch(returnErrors(error.response.data.message));
        })
}