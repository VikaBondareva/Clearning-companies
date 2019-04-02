import {
    USER_GET_SUCCESS
} from './actionTypes';
import {AuthService} from '../services';
import {authRequest}  from './authActions';
import { clearToken} from '../helpers/authentication';

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
                dispatch(getProfileSuccess(response.data));
            })
            .catch(()=>{
                clearToken();
            })
    }
}
