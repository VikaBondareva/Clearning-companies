import { ERRORS_GET, ERRORS_CLEAR } from './actionTypes';

// RETURN ERRORS
export const returnErrors = (message, status, id = null) => {
  return {
    type: ERRORS_GET,
    payload: {
      message,
      status,
      id
    }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: ERRORS_CLEAR
  };
};