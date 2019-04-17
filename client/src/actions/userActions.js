import {
    USER_GET_SUCCESS,
    USER_GET_ERROR
  } from "./actionTypes";
import { AuthService } from "../services";
import { UserService } from "../services";
import { CompanyService } from "../services";
import { makeActionCreator } from "./makeCreatorAction";
import { push} from "connected-react-router";
import {clearToken, storeUser } from "../utils/authentication";
import { returnErrors, clearErrors } from "./errorActions";

export function getProfileSuccess(profile) {
    return {
      type: USER_GET_SUCCESS,
      payload: {
        profile
      }
    };
  }
  
export function asyncGetCurrentProfile() {
  return function(dispatch) {
    return AuthService.getCurrentUser()
      .then(async response => {
        if (response.status !== 401) {
          console.log("profile success");
          await storeUser(response.data);
          dispatch(getProfileSuccess(response.data));
        } else {
          dispatch(push("/login"));
        }
      })
      .catch(error => {
        if (error.response && error.response.status !== 500) {
          dispatch(makeActionCreator(USER_GET_ERROR));
          clearToken();
        }
      });
  };
}

export const asyncEditProfile = (changedUser,redirect)  => dispatch => {
  dispatch(makeActionCreator("USER_EDIT_REQUEST"));
  return UserService.editUser(changedUser)
    .then(response => {
      dispatch(makeActionCreator("USER_EDIT_SUCCESS"));
      if(redirect){
        dispatch(push(redirect));
      }
      dispatch(asyncGetCurrentProfile())
       dispatch(clearErrors());
    })
    .catch((error) => {
      dispatch(makeActionCreator("USER_EDIT_ERROR"));
      dispatch(
        returnErrors(
          error.response.data.message,
          error.status,
          "USER_EDIT_ERROR"
        )
      );
    });
};

export const asyncEditCompanyProfile = (changedUser, redirect, isLogo = false) => dispatch => {
  dispatch(makeActionCreator("USER_EDIT_REQUEST"));
  return CompanyService.editCompany(changedUser,isLogo)
    .then(response => {
      dispatch(makeActionCreator("USER_EDIT_SUCCESS"));
      if(redirect){
        dispatch(push(redirect));
      }
      dispatch(asyncGetCurrentProfile())
       dispatch(clearErrors());
    })
    .catch((error) => {
      dispatch(makeActionCreator("USER_EDIT_ERROR"));
      dispatch(
        returnErrors(
          error.response.data.message,
          error.status,
          "USER_EDIT_ERROR"
        )
      );
    });
};