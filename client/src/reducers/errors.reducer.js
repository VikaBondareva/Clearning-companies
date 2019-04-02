import { GET_ERRORS, CLEAR_ERRORS } from '../actions/actionTypes';

const initialState = {
  message: '',
  status: null,
  id: null
}

export default function(state = initialState, {type, message, status, id}) {
  switch(type) {
    case GET_ERRORS:
      return {
        message,
        status,
        id
      };
    case CLEAR_ERRORS:
      return {
        message: '',
        status: null,
        id: null
      };
    default:
      return state;
  }
}