import {
  LIST_CONTROL_LOAD_REQUEST,
  LIST_CONTROL_LOADED_SUCCESS,
  LIST_CONTROL_LOADED_ERROR,
} from "./actionTypes";
import { makeActionCreator } from "./makeCreatorAction";
import { UserService, CompanyService } from "../services";

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

export const asyncGetControlUsers = query => dispatch => {
  dispatch(makeActionCreator(LIST_CONTROL_LOAD_REQUEST));
  return UserService.getUsers(query)
    .then(response => {
      dispatch(loadedListControlSuccess(response.data));
    })
    .catch(() => {
      dispatch(makeActionCreator(LIST_CONTROL_LOADED_ERROR));
    });
};

export const asyncGetControlCompanies = query => dispatch => {
  dispatch(makeActionCreator(LIST_CONTROL_LOAD_REQUEST));
  return CompanyService.getCompaniesAdmin(query)
    .then(response => {
      dispatch(loadedListControlSuccess(response.data));
    })
    .catch(() => {
      dispatch(makeActionCreator(LIST_CONTROL_LOADED_ERROR));
    });
};

export const asyncChangeStatusUser = (data, id) => dispatch => {
  dispatch(makeActionCreator("USER_CHANGE_STATUS_REQUEST"));
  return UserService.changeStatus(data, id)
    .then(() => {
      dispatch(makeActionCreator("USER_CHANGE_STATUS_SUCCESS"));
      dispatch(asyncGetControlUsers(""));
    })
    .catch(() => {
      dispatch(makeActionCreator("USER_CHANGE_STATUS_ERROR"));
    });
};

export const asyncChangeStatusCompany = (data, id) => dispatch => {
  dispatch(makeActionCreator("USER_CHANGE_STATUS_REQUEST"));
  return CompanyService.changeStatus(data, id)
    .then(() => {
      dispatch(makeActionCreator("USER_CHANGE_STATUS_SUCCESS"));
      dispatch(asyncGetControlCompanies(""));
    })
    .catch(() => {
      dispatch(makeActionCreator("USER_CHANGE_STATUS_ERROR"));
    });
};
