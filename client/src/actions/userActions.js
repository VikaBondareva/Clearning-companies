import {
    USER_GET_FAIL,
    USER_GET_SUCCESS,
    USER_GET_REQUEST
} from './actionTypes';
import {AuthService} from '../services';
import {authRequest}  from './authActions'

// export function getProfileRequest(){
//     return {
//         type: USER_GET_REQUEST
//     }
// }

export function getProfileSuccess(user){
    return {
        type: USER_GET_SUCCESS,
        profile: user
    }
}

export function getProfileFailure(error){
    return {
        type: USER_GET_FAIL,
        message: error.message
    }
}

export function asyncGetCurrentProfile(){
    return function(dispatch){
        dispatch(authRequest());
        return AuthService.getCurrentUser()
            .then((response)=>{
                if(response.status === 200)
                    dispatch(getProfileSuccess(response.data));
                else 
                    dispatch(getProfileFailure(response));
            })
            .catch(error=>{
                dispatch(getProfileFailure(error));
            })
    }
}
