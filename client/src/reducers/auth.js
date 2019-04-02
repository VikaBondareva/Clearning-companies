import {
  AUTH_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_GET_FAIL,
  USER_GET_SUCCESS,
  USER_GET_REQUEST
} from '../actions/actionTypes';
import jwt from 'jsonwebtoken';

const token =  localStorage.getItem('token');

const initialState = {
  isAuthenticated:token ? true : false,
  isLoading: false,
  message: "",
  role: token ? jwt.decode((JSON.parse(token).accessToken)).role : '',
  isSendEmail: false,
  profile: {}
};

export default (state = initialState, {type, tokens, message, profile}) => {
  switch (type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: ''
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        role: jwt.decode(tokens.accessToken).role,
        profile
      };
    case LOGIN_ERROR:
    case REGISTER_FAIL:
    case USER_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        role: null,
        message: `${message}`,
        isSendEmail: false,
        profile: {}
      }
    case REGISTER_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        isSendEmail: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        role: null,
        profile: {}
      }
    case USER_GET_SUCCESS: 
     return {
      ...state,
      isLoading: false,
      profile
     }
    default:
      return state;
  }
}