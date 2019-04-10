import {
  COMPANY_LOADED_SUCCESS,
  COMPANIES_LOADED_SUCCESS,
  REVIEWS_LIST_LOADED_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  docs: [],
  total: 0,
  page: 1,
  pages: 0,
  limit: 10
};

function setReviews(reviews, newReviews) {
  if (!reviews) {
    reviews = newReviews;
  } else if (reviews.docs) {
    const { docs, ...other } = reviews;
    const { docs :newDocs , ...newOther } = newReviews;
    reviews = {
      docs: [...docs, ...newDocs],
      ...newOther
    };
  }
  return reviews;
}

function setCompany(company, newCompany) {
  company = newCompany;
  return {
    ...company
  };
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case COMPANIES_LOADED_SUCCESS: {
      const { docs, total, page, pages, limit } = payload;
      return {
        docs,
        total,
        page,
        pages,
        limit
      };
    }
    case COMPANY_LOADED_SUCCESS:
      return {
        ...state,
        company: setCompany(state.company,payload.company)
      };
    case REVIEWS_LIST_LOADED_SUCCESS:
      return {
        ...state,
        reviews: setReviews(state.reviews, payload)
      };
    default:
      return state;
  }
};