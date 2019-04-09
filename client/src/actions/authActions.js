import {
    AUTH_REQUEST,
    AUTH_ERROR,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    REGISTER_COMPANY_ERROR,
    SAVE_COMPANY_REGISTER,
    EMAIL_CONFIRM_ERROR,
    SEND_EMAIL_DELETE,
    SEND_EMAIL_SUCCESS
} from './actionTypes';
import {AuthService} from '../services';
import {storeToken, clearToken} from '../helpers/authentication';
import {history} from '../helpers';
import { push, goBack } from "connected-react-router";
import {returnErrors} from './errorActions';

export function loginSuccess({tokens,user}) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            tokens,
            profile: user
        }
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
        payload: {
            company
        }
    }
}

export function deleteSendEmail(){
    return {
        type: SEND_EMAIL_DELETE
    }
}

export function sendEmailSuccess(){
    return {
        type: SEND_EMAIL_SUCCESS
    }
}

//redax-thunk
export   function asyncLogin({identifier, password}){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.login({identifier, password})
            .then(async response=>{
                console.log(response.status);
                    await storeToken(response.data.tokens, response.data.user);
                    dispatch(loginSuccess(response.data));
                    if(history.length>0){
                        dispatch(goBack());
                    } else {
                        dispatch(push('/profile'));
                    }
            })
            .catch(async error => {
                if (error.response.status === 400) {
                    console.log(error.response.data.message);
                    await dispatch(authError());
                    dispatch(returnErrors(error.response.data.message, error.response.status, LOGIN_ERROR ));
                } else {
                    await dispatch(authError());
                    await dispatch(sendEmailSuccess());
                    dispatch(returnErrors(error.response.data.message, error.response.status, LOGIN_ERROR ));
                }
            })
    }
}

export function asyncRegisterUser(user){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.registration(user)
            .then(()=>{
                dispatch(registerSuccess());
                dispatch(sendEmailSuccess());
            })
            .catch(error=>{
                dispatch(authError(error));
                dispatch(returnErrors(error.data.message, error.status, REGISTER_ERROR ));
            })
    }
}

export function asyncRegisterCompany(company){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.registrationCompany(company)
            .then((response)=>{
                if(response.status === 201){
                    dispatch(registerSuccess());
                    dispatch(sendEmailSuccess());
                }
            })
            .catch(error=>{
                dispatch(authError());
                dispatch(returnErrors(error.response.data.message, error.status, REGISTER_COMPANY_ERROR ));
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

export const asyncConfirmEmail = (token, email) => dispatch => {
    return AuthService.confirmEmail(token, email)
        .then(response => {
            if(response.status === 200) {   
                storeToken(response.data.tokens, response.data.user);
                dispatch(loginSuccess(response.data));
            } else {
                dispatch(authError());
                dispatch(returnErrors(response.data.message, response.status, EMAIL_CONFIRM_ERROR ));
            }
        })
        .catch((error)=>{
            dispatch(authError());
            dispatch(returnErrors(error.response.data.message, error.status, EMAIL_CONFIRM_ERROR ));
        })
}