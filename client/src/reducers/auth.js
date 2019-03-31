import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../actions/actionTypes';
import jwt from 'jsonwebtoken';

const initialState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isLoading: false,
  message: null,
  role: null,
  isSendEmail: false
};

export default (state = initialState, {type, token, message}) => {
  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
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
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        role: null,
        message: `${message}`,
        isSendEmail: false
      }
    case REGISTER_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        isSendEmail: true
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