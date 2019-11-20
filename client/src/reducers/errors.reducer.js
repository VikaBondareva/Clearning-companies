import { ERRORS_GET, ERRORS_CLEAR } from '../actions/actionTypes';

const initialState = {
  message: ''
}

export default function(state = initialState, {type,payload}) {
  switch(type) {
    case ERRORS_GET:{
      const {message} = payload;
      return {
        message,
      };
    }
    case ERRORS_CLEAR:
      return {
        message: ''
      };
    default:
      return state;
  }
}