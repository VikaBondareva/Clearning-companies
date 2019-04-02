import {
  COMPANIES_REQUEST,
  COMPANIES_SUCCESS,
  COMPANY_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  message: null,
  docs: [],
  total: 1,
  page: 1,
  pages: 0,
  limit: 10,
  company:{
    name:"",
    address:"",
    ratting:"", 
    workPlan:"", 
    services:"",
    description:""
  }
};

export default (state = initialState, {type, docs,total,page,pages,limit, company}) => {
  switch (type) {
    case COMPANIES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case COMPANIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        docs,
        total,
        page,
        pages,
        limit
      };
    case COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        company
      }
    default:
      return state;
  }
}