import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATED_SUCCESS,
  ORDER_CREATED_ERROR,
  ORDER_SAVE_STORE,
  ORDERS_LIST_LOAD_REQUEST,
  ORDERS_LIST_LOADED_SUCCESS,
  ORDERS_LIST_LOADED_ERROR
} from "./actionTypes";
import { OrdersService } from "../services";
import { returnErrors } from "./errorActions";

export const createOrderRequest = () => ({
  type: ORDER_CREATE_REQUEST
});

export const createdOrderSuccess = () => ({
  type: ORDER_CREATED_SUCCESS
});

export const createdOrderError = () => ({
  type: ORDER_CREATED_ERROR
});

export const saveOrderInStore = order => ({
  type: ORDER_SAVE_STORE,
  payload: {
    order
  }
});

export const loadOrdersListRequest = () => ({
  type: ORDERS_LIST_LOAD_REQUEST
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

export const loadedOrdersListError = () => ({
  type: ORDERS_LIST_LOADED_ERROR
});


//async functions
export const asyncCreateOrder = date => dispatch => {
  dispatch(createOrderRequest());
  return OrdersService.createOrder(date)
    .then(response => {
      console.log(response);
      dispatch(createdOrderSuccess());
    })
    .catch(error => {
      dispatch(createdOrderError());
      dispatch(
        returnErrors(
          error.response.data.message,
          error.status,
          ORDER_CREATED_ERROR
        )
      );
    });
};

export const asyncGetOrders = queries => dispatch => {
  dispatch(loadOrdersListRequest());
  return OrdersService.getOrders(queries)
    .then(response => {
        console.log(response.data);
      dispatch(loadedOrdersListSuccess(response.data));
    })
    .catch(error => {
      dispatch(loadedOrdersListError());
    });
};
