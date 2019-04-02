import {
    AUTH_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './actionTypes';
import {AuthService} from '../services';
import {history} from '../helpers'

export function loginSuccess({tokens,user}) {
    localStorage.setItem('token', JSON.stringify(tokens));
    return {
        type: LOGIN_SUCCESS,
        tokens,
        profile: user
    }
}

export function loginFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_ERROR,
        message: error.response.data.message
    }
}

export function authRequest() {
    return {
        type: AUTH_REQUEST
    }
}

export function logoutSuccess() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_SUCCESS
    }
}

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
    }
}

export function registerFailure(error) {
    return {
        type: REGISTER_FAIL,
        message: error.response.data.message
    }
}

export  function Login({identifier, password},redirectTo){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.login({identifier, password})
            .then(response=>{
                dispatch(loginSuccess(response.data));
                history.push('/profile');
            })
            .catch(error => {
                dispatch(loginFailure(error));
            })
    }
}

export function RegisterUser(user){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.registration(user)
            .then(()=>{
                dispatch(registerSuccess());
            })
            .catch(error=>{
                dispatch(registerFailure(error));
            })
    }
}

export function RegisterCompany(company){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.registration(company)
            .then((response)=>{
                if(response.status === 201)
                    dispatch(registerSuccess());
                else 
                    dispatch(registerFailure(response));
            })
            .catch(error=>{
                dispatch(registerFailure(error));
            })
    }
}