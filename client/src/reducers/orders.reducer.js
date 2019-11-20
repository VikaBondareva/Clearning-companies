import {
    ORDER_SAVE_STORE,
    ORDERS_LIST_LOADED_SUCCESS,
    ORDER_LOADED_SUCCESS,
    ORDER_UPDATED_STATUS_SUCCESS
  } from '../actions/actionTypes';

  const initialState = {
      docs: [],
      total: 0,
      page: 1,
      pages: 0,
      limit: 10
  };
  
  export default (state = initialState, {type, payload}) => {
    switch (type) {
      case ORDER_SAVE_STORE:
        return addNewCreateOrder(state,payload);
      case "ORDER_REMOVE_STORE": 
        return removeCreateOrder(state);
      case ORDERS_LIST_LOADED_SUCCESS: 
        return addDocsOrders(payload);
      case ORDER_LOADED_SUCCESS: 
        return addOrder(state, payload);
      case ORDER_UPDATED_STATUS_SUCCESS: 
        return changeStatusOrder(state, payload);
      default:
        return state;
    }
  }

  function addDocsOrders(payload){
    const { docs, total, page, pages, limit } = payload;
    return {
      docs,
      total,
      page,
      pages,
      limit
    };
  }

  function addOrder(state,payload){
    return {
      ...state,
      order: payload.order
    }
  }

  function addNewCreateOrder(state,payload){
    return {
      ...state,
      orderCreate: payload.order
    }
  }

  const  changeStatusOrder = (state, payload) => {
    state.order.status = payload.status;
    if(payload.lockMessage){
      state.order.lockMessage = payload.lockMessage;
    }
    return state;
  }

  const removeCreateOrder = state => {
    delete state.createOrder;
    return state;
  }