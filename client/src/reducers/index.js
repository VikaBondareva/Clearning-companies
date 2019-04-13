import { combineReducers } from 'redux';
import auth from './auth.reducer';
import companies from './companies.reducer';
import error from './errors.reducer';
import orders from './orders.reducer'
import loading from './loader.reducer';
import admin from './admin.reducer';
import { connectRouter} from "connected-react-router";
import {history} from '../helpers';

const rootReducer = combineReducers({
     auth, 
     companies,
     error,
     users: admin,
     // isLoading,
     loading,
     orders,
     router: connectRouter(history)
});

export default rootReducer;