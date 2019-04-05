import {
  COMPANY_LOAD_SUCCESS,
  COMPANIES_LOAD_SUCCESS,
  COMPANIES_LOAD_ERROR
} from '../actions/actionTypes';

const initialState = {
  docs: [],
  total: 1,
  page: 1,
  pages: 0,
  limit: 10,
  company:{}
};

export default (state = initialState, {type,payload}) => {
  switch (type) {
    case COMPANIES_LOAD_SUCCESS: {
      const  {docs,total,page,pages,limit} = payload;
      return {
        docs,
        total,
        page,
        pages,
        limit
      };
    }
    case COMPANY_LOAD_SUCCESS:
      return {
        ...state,
        company: payload.company
      }
    case COMPANIES_LOAD_ERROR: 
      return {
        isLoading: false
      }
    default:
      return state;
  }
}