import {
  AUTH_REQUEST,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  USER_GET_ERROR,
  USER_GET_SUCCESS,
  SAVE_COMPANY_REGISTER,
  EMAIL_CONFIRM_ERROR,
  SEND_EMAIL_DELETE,
  SEND_EMAIL_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  role: null,
  isLoading: false,
  isSendEmail: false,
  profile: {},
  company: {
    personal: {
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
    rooms: {
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
    }
  }
};

function loginAuth(state, payload) {
  return {
    ...state,
    isLoading: false,
    isAuthenticated: true,
    profile: payload.profile,
    role: payload.profile.role
  };
}

function setNewUserState(state, payload) {
  return {
    ...state,
    isLoading: false,
    isAuthenticated: true,
    profile: payload.profile
  };
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS: {
      return loginAuth(state, payload);
    }
    case USER_GET_ERROR: {
      return initialState;
    }
    case AUTH_ERROR:
    case EMAIL_CONFIRM_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case REGISTER_SUCCESS:
      return {
        isAuthenticated: false,
        isLoading: false
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case USER_GET_SUCCESS:
      return setNewUserState(state, payload);
    case SAVE_COMPANY_REGISTER:
      return {
        ...state,
        company: payload.company
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isSendEmail: true
      };
    case SEND_EMAIL_DELETE:
      return {
        ...state,
        isSendEmail: false
      };
    default:
      return state;
  }
};
