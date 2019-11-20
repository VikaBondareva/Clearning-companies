import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATED_SUCCESS,
  ORDER_CREATED_ERROR,
  ORDER_SAVE_STORE,
  ORDERS_LIST_LOAD_REQUEST,
  ORDERS_LIST_LOADED_SUCCESS,
  ORDERS_LIST_LOADED_ERROR,
  ORDER_LOAD_REQUEST,
  ORDER_LOADED_SUCCESS,
  ORDER_LOADED_ERROR,
  ORDER_UPDATED_STATUS_SUCCESS,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATED_STATUS_ERROR,
} from "./actionTypes";
import { OrdersService } from "../services";
import {makeActionCreator} from './makeCreatorAction';
import { returnErrors } from "./errorActions";
import { push } from "connected-react-router";

export const saveOrderInStore = order => ({
  type: ORDER_SAVE_STORE,
  payload: {
    order
  }
});

export const loadedOrdersListSuccess = ({
  docs,
  page,
  pages,
  total,
  limit
}) => ({
  type: ORDERS_LIST_LOADED_SUCCESS,
  payload: {
    docs,
    total,
    page,
    pages,
    limit
  }
});

export const loadedOrderSuccess = order => ({
  type: ORDER_LOADED_SUCCESS,
  payload: {
    order
  }
})

export const updateStatusOrderSuccess = (status, lockMessage) => ({
  type: ORDER_UPDATED_STATUS_SUCCESS,
  payload: {
    status,
    lockMessage
  }
})


//async functions
export const asyncCreateOrder = date => dispatch => {
  dispatch(makeActionCreator(ORDER_CREATE_REQUEST));
  return OrdersService.createOrder(date)
    .then(response => {
      console.log(response);
      dispatch(makeActionCreator("ORDER_REMOVE_STORE"))
      dispatch(makeActionCreator(ORDER_CREATED_SUCCESS));
      dispatch(push('/profile/orders'));
    })
    .catch(error => {
      dispatch(makeActionCreator(ORDER_CREATED_ERROR));
      dispatch(
        returnErrors(
          error.response.data.message
        )
      );
    });
};

export const asyncGetOrders = queries => dispatch => {
  dispatch(makeActionCreator(ORDERS_LIST_LOAD_REQUEST));
  return OrdersService.getOrders(queries)
    .then(response => {
        console.log(response.data);
      dispatch(loadedOrdersListSuccess(response.data));
    })
    .catch(error => {
      dispatch(makeActionCreator(ORDERS_LIST_LOADED_ERROR));
    });
};

export const asyncGetOrderById = id => dispatch => {
  dispatch(makeActionCreator(ORDER_LOAD_REQUEST))
  return OrdersService.getOrderById(id)
    .then((response)=> {
      dispatch(loadedOrderSuccess(response.data));
    })
    .catch(error => {
      dispatch(makeActionCreator(ORDER_LOADED_ERROR));
    });
}

export const asyncChangeStatusOrder = (_id,status, lockMessage = null) => dispatch => {
  dispatch(makeActionCreator(ORDER_UPDATE_STATUS_REQUEST))
  return OrdersService.changeStatusOrder({_id, status, lockMessage})
    .then((response)=>{
      dispatch(updateStatusOrderSuccess(status, lockMessage))
    })
    .catch((error)=>{
      dispatch(makeActionCreator(ORDER_UPDATED_STATUS_ERROR));
    })
}

export const asyncDeleteOrder = id => dispatch => {
  dispatch(makeActionCreator("ORDER_DELETE"));
  OrdersService.deleteOrder(id)
    .then((response)=>{
      dispatch(asyncGetOrders());
    })
    .catch(error=>{
      dispatch(asyncGetOrders());
    })
}
