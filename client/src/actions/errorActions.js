import { ERRORS_GET, ERRORS_CLEAR } from './actionTypes';

// RETURN ERRORS
export const returnErrors = (message) => {
  return {
    type: ERRORS_GET,
    payload: {
      message
    }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: ERRORS_CLEAR
  };
};