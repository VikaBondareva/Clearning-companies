import {
    AUTH_REQUEST,
    AUTH_ERROR,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_COMPANY_FAIL,
    SAVE_COMPANY_REGISTER
} from './actionTypes';
import {AuthService} from '../services';
import {storeToken, clearToken} from '../helpers/authentication';
import { push } from "connected-react-router";
import {returnErrors} from './errorActions';

export function loginSuccess({tokens,user}) {
    return {
        type: LOGIN_SUCCESS,
        tokens,
        profile: user
    }
}

export function authError() {
    return {
        type: AUTH_ERROR,
    }
}

export function authRequest() {
    return {
        type: AUTH_REQUEST
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
    }
}

export function saveRegisterInState(company){
    return {
        type: SAVE_COMPANY_REGISTER,
        company
    }
}


//redax-thunk
export  function asyncLogin({identifier, password},redirectTo){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.login({identifier, password})
            .then(response=>{
                dispatch(loginSuccess(response.data));
                storeToken(response.data.tokens, response.data.user);
                dispatch(push('/profile'));
            })
            .catch(error => {
                dispatch(authError());
                dispatch(returnErrors(error.response.data.message, error.response.status, LOGIN_ERROR ));

            })
    }
}

export function asyncRegisterUser(user){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.registration(user)
            .then(()=>{
                dispatch(registerSuccess());
            })
            .catch(error=>{
                dispatch(authError(error));
                dispatch(returnErrors(error.data.message, error.status, REGISTER_FAIL ));
            })
    }
}

export function asyncRegisterCompany(company){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.registration(company)
            .then((response)=>{
                if(response.status === 201){
                    dispatch(registerSuccess());
                } else {
                    dispatch(returnErrors(response.data.message, response.status, REGISTER_COMPANY_FAIL ));
                   } 
            })
            .catch(error=>{
                dispatch(authError());
                dispatch(returnErrors(error.response.data.message, error.status, REGISTER_COMPANY_FAIL ));
            })
    }
}

export const asyncLogout = () => dispatch => {
    return AuthService.logout()
        .then(()=>{
            clearToken();
            dispatch(logoutSuccess());
        })
}