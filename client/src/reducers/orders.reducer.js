import {
    ORDER_SAVE_STORE
  } from '../actions/actionTypes';
  
  
  export default (state = {}, {type, payload}) => {
    switch (type) {
      case ORDER_SAVE_STORE:
        return {
          order: payload.order
        };
      default:
        return state;
    }
  }