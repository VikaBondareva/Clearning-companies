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
  SEND_SUCCESS_EMAIL,
  SAVE_EMAIL_STORE
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  role: null,
  tokens: {},
  isLoading: false,
  isSendEmail: false,
  profile: {}
};

function loginAuth(state, payload) {
  return {
    ...state,
    isLoading: false,
    isAuthenticated: true,
    profile: payload.profile,
    tokens: payload.tokens,
    role: payload.profile.role
  };
}

function setNewUserState(state, payload) {
  return {
    ...state,
    isLoading: false,
    isAuthenticated: true,
    profile: payload.profile,
    role: payload.profile.role
  };
}

function saveEmailStore(state, payload) {
  return {
    ...state,
    email: payload.email,
    isSendCode: true
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
    case SAVE_EMAIL_STORE:
      return saveEmailStore(state, payload);
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
    case SEND_SUCCESS_EMAIL:
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
