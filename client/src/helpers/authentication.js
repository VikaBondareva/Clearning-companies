import {loginSuccess} from '../actions/authActions';

const AUTH_TOKE_KEY = "tokens";
const USER_KEY = "user";

export const initializePreviousToken = store => {
  const tokens = JSON.parse(localStorage.getItem(AUTH_TOKE_KEY));
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  if (tokens) store.dispatch(loginSuccess({tokens, user}));
};

export const storeToken = (tokens, user) => {
  localStorage.setItem(AUTH_TOKE_KEY, JSON.stringify(tokens));
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearToken = () => {
  localStorage.removeItem(AUTH_TOKE_KEY);
  localStorage.removeItem(USER_KEY);
};