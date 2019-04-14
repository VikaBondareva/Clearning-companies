import {loginSuccess} from '../actions/authActions';
import {asyncGetCurrentProfile} from '../actions/userActions';

const AUTH_TOKE_KEY = "tokens";
const USER_KEY = "user";

export const initializePreviousToken = async store => {
  const tokens = JSON.parse(localStorage.getItem(AUTH_TOKE_KEY));
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  if (tokens) {
    await store.dispatch(loginSuccess(user));
    store.dispatch(asyncGetCurrentProfile());
  }
  
};

export const storeToken = tokens => {
  localStorage.setItem(AUTH_TOKE_KEY, JSON.stringify(tokens));
};

export const storeUser = user => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const clearToken = () => {
  localStorage.removeItem(AUTH_TOKE_KEY);
  localStorage.removeItem(USER_KEY);
};