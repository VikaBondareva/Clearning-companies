import { LIST_CONTROL_LOADED_SUCCESS } from "../actions/actionTypes";

const initialState = {
    docs: [],
    total: 0,
    page: 1,
    pages: 0,
    limit: 10
  };

function setListControl(payload) {
    const { docs, total, page, pages, limit } = payload;
    return {
      docs,
      total,
      page,
      pages,
      limit
    };
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LIST_CONTROL_LOADED_SUCCESS: {
      return setListControl(payload)
    }
    default:
      return state;
  }
};
