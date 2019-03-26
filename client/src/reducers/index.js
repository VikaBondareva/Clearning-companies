import { combineReducers } from 'redux';
import companies from './companies';
import filters from './filters';

const rootReducer = combineReducers({ companies, filters });

export default rootReducer;