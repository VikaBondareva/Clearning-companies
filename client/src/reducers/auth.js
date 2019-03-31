import {LOGIN_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_USER} from '../actions/actionTypes';
import jwt from 'jsonwebtoken';

const initialState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isLoading: false,
  message: null,
  role: null
};

export default (state = initialState, {type, token, status, message}) => {
  switch(type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: null
      };
    case LOGIN_SUCCESS: 
      return {
        ...state,  
        isLoading: false,
        isAuthenticated: true,
        role: jwt.decode(token.accessToken).role
      };
    case LOGIN_ERROR: 
      return {
        ...state,  
        isLoading: false,
        isAuthenticated: false,
        role: null,
        message: `Authentication Error: ${status} ${message}`
      }
    case LOGOUT_USER: 
      return {
        ...state,  
        isAuthenticated: false,
        role: null,
      }
    default: 
        return state;
  }
}