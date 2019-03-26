import {REGISTER_COMPANY, REGISTER_USER, AUTH_LOGIN} from '../constants/constants';

const auth = (state = [], action) => {
    switch (action.type) {
        case AUTH_LOGIN : 
            return [
                ...state, 
                action.isAuth
            ];
    }
}