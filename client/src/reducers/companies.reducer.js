import {
  COMPANY_LOADED_SUCCESS,
  COMPANIES_LOADED_SUCCESS,
  REVIEWS_LIST_LOADED_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  docs: [],
  total: 0,
  page: 1,
  pages: 0,
  limit: 10
};

function setReviews(state, reviews){
  const {company, ...companies} = state;
  if(!company){
    company ={};
  }
  if(reviews.docs && company.reviews){
    company.reviews.docs = [...company.reviews.docs, ...reviews.docs];
    company.reviews.total = reviews.total;
    company.reviews.page = reviews.page;
    company.reviews.pages = reviews.pages;
  } else if(reviews.docs) {
    company.reviews = reviews;
  }
  return {
    ...companies,
    company
  }
}

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
    case REVIEWS_LIST_LOADED_SUCCESS: 
      return setReviews(state,payload)
    default:
      return state;
  }
}