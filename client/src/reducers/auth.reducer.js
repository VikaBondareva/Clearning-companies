import {
  AUTH_REQUEST,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_GET_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated:false,
  tokens: null,
  isLoading: false,
  isSendEmail: false,
  profile: {}
};

export default (state = initialState, {type, tokens, profile}) => {
  switch (type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        profile,
        tokens
      };
    case AUTH_ERROR:
      return {
        isLoading: false,
        isAuthenticated: false,
        tokens: null,
        role: null,
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
        isLoading: false,
        isAuthenticated: false,
        tokens: null,
        role: null,
        profile: {}
      }
    case USER_GET_SUCCESS: 
     return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        profile
     }
    default:
      return state;
  }
}