import {
  COMPANIES_LOAD_REQUEST,
  COMPANY_LOAD_SUCCESS,
  COMPANIES_LOAD_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  message: null,
  docs: [],
  total: 1,
  page: 1,
  pages: 0,
  limit: 10,
  company:{}
};

export default (state = initialState, {type, docs,total,page,pages,limit, company}) => {
  switch (type) {
    case COMPANIES_LOAD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case COMPANIES_LOAD_SUCCESS:
      return {
        isLoading: false,
        docs,
        total,
        page,
        pages,
        limit
      };
    case COMPANY_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        company
      }
    default:
      return state;
  }
}