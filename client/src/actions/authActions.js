import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT_USER,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
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

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
    }
}

export function registerFailure(error) {
    return {
        type: REGISTER_FAIL,
        status: error.response.status,
        message: error.response.data.message
    }
}

export function registerRequest() {
    return {
        type: REGISTER_REQUEST
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

export function RegisterUser(user){
    return function(dispatch){
        dispatch(registerRequest());
        return authService.registration(user)
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
        dispatch(registerRequest());
        return authService.registration(company)
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
