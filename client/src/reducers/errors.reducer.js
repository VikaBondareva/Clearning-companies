import { ERRORS_GET, ERRORS_CLEAR } from '../actions/actionTypes';

const initialState = {
  message: '',
  status: null,
  id: null
}

export default function(state = initialState, {type,payload}) {
  switch(type) {
    case ERRORS_GET:{
      const {message, status, id} = payload;
      return {
        message,
        status,
        id
      };
    }
    case ERRORS_CLEAR:
      return {
        message: '',
        status: null,
        id: null
      };
    default:
      return state;
  }
}