import {
    ORDER_SAVE_STORE,
    ORDERS_LIST_LOADED_SUCCESS
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
        return {
          order: payload.order
        };
      case ORDERS_LIST_LOADED_SUCCESS: 
        const { docs, total, page, pages, limit } = payload;
        return {
          ...state,
          docs,
          total,
          page,
          pages,
          limit
        };
      default:
        return state;
    }
  }