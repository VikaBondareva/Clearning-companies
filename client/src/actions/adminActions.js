import {
  LIST_CONTROL_LOAD_REQUEST,
  LIST_CONTROL_LOADED_SUCCESS,
  LIST_CONTROL_LOADED_ERROR,
} from "./actionTypes";
import { makeActionCreator } from "./makeCreatorAction";
import { UserService } from "../services";

const loadedListControlSuccess = ({ docs, total, page, pages, limit }) => ({
  type: LIST_CONTROL_LOADED_SUCCESS,
  payload: {
    docs,
    total,
    page,
    pages,
    limit
  }
});

export const asyncGetControlUsers = (query, role) => dispatch => {
  dispatch(makeActionCreator(LIST_CONTROL_LOAD_REQUEST));
  return UserService.getUsers(query,role)
    .then(response => {
      dispatch(loadedListControlSuccess(response.data));
    })
    .catch(() => {
      dispatch(makeActionCreator(LIST_CONTROL_LOADED_ERROR));
    });
};

export const asyncChangeStatusUser = (data, id, role) => dispatch => {
  dispatch(makeActionCreator("USER_CHANGE_STATUS_REQUEST"));
  return UserService.changeStatus(data, id, role)
    .then(() => {
      dispatch(makeActionCreator("USER_CHANGE_STATUS_SUCCESS"));
      dispatch(asyncGetControlUsers(""));
    })
    .catch(() => {
      dispatch(makeActionCreator("USER_CHANGE_STATUS_ERROR"));
    });
};