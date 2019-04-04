import {
  AUTH_REQUEST,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_GET_SUCCESS,
  SAVE_COMPANY_REGISTER,
  EMAIL_CONFIRM_ERROR,
  SEND_EMAIL_DELETE,
  SEND_EMAIL_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated:false,
  tokens: null,
  isLoading: false,
  isSendEmail: false,
  profile: {},
  company: {
    personal : {
      name: "xfndfnsrt",
      email: "company@dispostable.com",
      description: "description 1mmm dfgn dg mgcnmdgcfndghndxfgnsfgngdhndgf",
      address: {
        city: "Mogilev",
        country: "Belarus",
        other: "dgndfg"
      },
      password: "123456Q"
    },
    rooms : {
      toilet: {
        price: 10,
        time: 50
      },
      standart: {
        price: 10,
        time: 50
      },
      big: {
        price: 10,
        time: 50
      }
    },
    services: [
      {
        name: "Service 1",
        coefficient: 1.3
      }
    ]
  }
};

export default (state = initialState, {type, tokens, profile, company}) => {
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
    case EMAIL_CONFIRM_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case REGISTER_SUCCESS: 
      return {
        isAuthenticated:false,
        tokens: null,
        isLoading: false
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
    case SAVE_COMPANY_REGISTER: 
     return {
        ...state,
        company
      }
    case SEND_EMAIL_SUCCESS: 
      return {
        ...state,
        isSendEmail: true
      }
    case SEND_EMAIL_DELETE: 
      return {
        ...state,
        isSendEmail: false
      }
    default:
      return state;
  }
}