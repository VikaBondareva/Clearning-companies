import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT_USER
} from './actionTypes';
import authService from '../services/auth.service';

export function loginSuccess(token) {
    localStorage.setItem('token', JSON.stringify(token));
    return {
        type: LOGIN_SUCCESS,
        token: token
    }
}

export function loginFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_ERROR,
        status: error.response.status,
        message: error.response.data.message
    }
}

export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

export function logoutRequest() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}


export  function Login({identifier, password},redirectTo){
    return function(dispatch){
        dispatch(loginRequest());
        return authService.login({identifier, password})
            .then(response=>{
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            })
    }
}
