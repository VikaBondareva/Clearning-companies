import {
    USER_GET_SUCCESS
} from './actionTypes';
import {AuthService} from '../services';
import {authRequest}  from './authActions';
import { clearToken} from '../helpers/authentication';
import { push } from "connected-react-router";

export function getProfileSuccess(user){
    return {
        type: USER_GET_SUCCESS,
        profile: user
    }
}

export function asyncGetCurrentProfile(){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.getCurrentUser()
            .then((response)=>{
                if(response.status!==401){
                    console.log("profile success")
                    dispatch(getProfileSuccess(response.data));
                } else {
                    dispatch(push('/login'));
                }
            })
            .catch(()=>{
                console.log("profile error")
                clearToken();
            })
    }
}
