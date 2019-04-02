import { combineReducers } from 'redux';
import auth from './auth.reducer';
import companies from './companies.reducer';
import error from './errors.reducer';
// import filters from './filters';
import { connectRouter} from "connected-react-router";
import {history} from '../helpers';

const rootReducer = combineReducers({
     auth, 
     companies,
     error,
     router: connectRouter(history)
     // filters,
});

export default rootReducer;