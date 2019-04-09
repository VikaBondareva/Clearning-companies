import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATED_SUCCESS,
    ORDER_CREATED_ERROR,
    ORDER_SAVE_STORE
} from './actionTypes';
import {OrdersService} from '../services';
import {returnErrors} from './errorActions';

export const createOrderRequest = () => ({
    type: ORDER_CREATE_REQUEST
})

export const createdOrderSuccess = () => ({
    type: ORDER_CREATED_SUCCESS,
})

export const createdOrderError = () => ({
    type: ORDER_CREATED_ERROR
})

export function saveOrderInStore(order){
    return {
        type: ORDER_SAVE_STORE,
        payload: {
            order
        }
    }
}

export const asyncCreateOrder = date => dispatch => {
    dispatch(createOrderRequest());
    return OrdersService.createOrder(date)
        .then(response => {
            console.log(response);
            dispatch(createdOrderSuccess());
        })
        .catch(error=>{
            dispatch(createdOrderError());
            dispatch(returnErrors(error.response.data.message, error.status, ORDER_CREATED_ERROR ));
        })
}
