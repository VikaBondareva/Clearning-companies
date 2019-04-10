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

function setReviews(state, newReviews) {
  if (!state.reviews) {
    state.reviews = newReviews;
  } else if (state.reviews.docs) {
    const { docs, ...other } = state.reviews;
    const { newDocs, ...newOther } = newReviews;
    docs = [...docs, ...newDocs];
    other = newOther;
    state.reviews = {
      docs,
      ...other
    };
  }
  return state;
}

function setCompany(state, newCompany) {
  state.company = newCompany;
  return {
    ...state
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
      return setCompany(state, payload.company);
    case REVIEWS_LIST_LOADED_SUCCESS:
      return setReviews(state, payload);
    default:
      return state;
  }
};
