import { combineReducers } from 'redux';
import auth from './auth.reducer';
import companies from './companies.reducer';
import error from './errors.reducer';
import orders from './orders.reducer'
import isLoading from './loader.reducer';
import { connectRouter} from "connected-react-router";
import {history} from '../helpers';

const rootReducer = combineReducers({
     auth, 
     companies,
     error,
     isLoading,
     orders,
     router: connectRouter(history)
});

export default rootReducer;