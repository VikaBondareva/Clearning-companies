import { combineReducers } from 'redux';
import auth from './auth';
import companies from './companies';
// import filters from './filters';

const rootReducer = combineReducers({
     auth, 
     companies,
     // filters,
});

export default rootReducer;