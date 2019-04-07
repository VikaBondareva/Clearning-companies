import {
  COMPANY_LOADED_SUCCESS,
  COMPANIES_LOADED_SUCCESS,
  COMPANIES_LIST_CLEAR,
} from '../actions/actionTypes';

const initialState = {
  docs: [],
  total: 0,
  page: 1,
  pages: 0,
  limit: 10,
  company: {},
};

export default (state = initialState, {type,payload}) => {
  switch (type) {
    case COMPANIES_LOADED_SUCCESS: {
      const  {docs,total,page,pages,limit} = payload;
      return {
        docs,
        total,
        page,
        pages,
        limit,
      };
    }
    case COMPANY_LOADED_SUCCESS:
      return {
        ...state,
        company: payload.company
      }
    case COMPANIES_LIST_CLEAR: 
      return {
        ...initialState
      }
    default:
      return state;
  }
}