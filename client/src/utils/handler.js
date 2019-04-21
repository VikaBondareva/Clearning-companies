import { AuthService } from "../services";
import { makeActionCreator } from "../actions/makeCreatorAction";
import { asyncLogout,asyncRefreshToken } from "../actions/authActions.js";
import {storeToken} from './authentication';
import jwt from 'jwt-decode';

export const jwtCheck = ({dispatch,getState }) => next => action => {
    if (typeof action === "function") {
      let tokens = JSON.parse(localStorage.getItem('tokens'));
      if (
        tokens 
        && tokens.accessToken 
        && isTokenExpired(tokens.accessToken)) {
      	return asyncRefreshToken(dispatch).then(()=>next(action));
      }
    }
    return next(action);
}

const isTokenExpired = token  => {
  const tok =   jwt(token).exp;
  const date  =  new Date().getTime()/1000 + 50
  let isExpires = tok  < date  ; 
  return isExpires;
}
