import {
  AUTH_REQUEST,
  AUTH_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_COMPANY_ERROR,
  SAVE_COMPANY_REGISTER,
  EMAIL_CONFIRM_ERROR,
  EMAIL_CONFIRM_REQUEST,
  EMAIL_CONFIRM_SUCCESS,
  SEND_EMAIL_DELETE,
  SEND_EMAIL_SUCCESS,
  USER_GET_SUCCESS,
  USER_GET_ERROR
} from "./actionTypes";
import { AuthService } from "../services";
import { storeToken, clearToken } from "../helpers/authentication";
import { history } from "../helpers";
import { makeActionCreator } from "./makeCreatorAction";
import { push, goBack } from "connected-react-router";
import { returnErrors, clearErrors } from "./errorActions";

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: {
    profile: user
  }
});

export const saveRegisterInState = company => ({
  type: SAVE_COMPANY_REGISTER,
  payload: {
    company
  }
});

export const deleteSendEmail = () => ({
  type: SEND_EMAIL_DELETE
});

export function getProfileSuccess(profile) {
  return {
    type: USER_GET_SUCCESS,
    payload: {
      profile
    }
  };
}

//redax-thunk
export function asyncLogin({ identifier, password }) {
  return function(dispatch) {
    dispatch(makeActionCreator(AUTH_REQUEST));
    return AuthService.login({ identifier, password })
      .then(async response => {
        console.log(response.status);
        await storeToken(response.data.tokens, response.data.user);
        dispatch(loginSuccess(response.data.user));
        dispatch(clearErrors())
        if (history.length > 0) {
          dispatch(goBack());
        } else {
          dispatch(push("/profile"));
        }
      })
      .catch(async error => {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          await dispatch(makeActionCreator(AUTH_ERROR));
          dispatch(
            returnErrors(
              error.response.data.message,
              error.response.status,
              LOGIN_ERROR
            )
          );
        } else {
          await dispatch(makeActionCreator(AUTH_ERROR));
          await dispatch(makeActionCreator(SEND_EMAIL_SUCCESS));
          dispatch(
            returnErrors(
              error.response.data.message,
              error.response.status,
              LOGIN_ERROR
            )
          );
        }
      });
  };
}

export function asyncRegisterUser(user) {
  return function(dispatch) {
    dispatch(makeActionCreator(AUTH_REQUEST));
    return AuthService.registration(user)
      .then(() => {
        dispatch(makeActionCreator(REGISTER_SUCCESS));
        dispatch(clearErrors())
        dispatch(makeActionCreator(SEND_EMAIL_SUCCESS));
      })
      .catch(error => {
        dispatch(makeActionCreator(AUTH_ERROR));
        dispatch(
          returnErrors(
            error.response.data.message,
            error.response.status,
            REGISTER_ERROR
          )
        );
      });
  };
}

export function asyncRegisterCompany(company) {
  return function(dispatch) {
    dispatch(makeActionCreator(AUTH_REQUEST));
    return AuthService.registrationCompany(company)
      .then(response => {
        if (response.status === 201) {
          dispatch(makeActionCreator(REGISTER_SUCCESS));
          dispatch(clearErrors())
          dispatch(makeActionCreator(SEND_EMAIL_SUCCESS));
        }
      })
      .catch(error => {
        dispatch(makeActionCreator(AUTH_ERROR));
        dispatch(
          returnErrors(
            error.response.data.message,
            error.response.status,
            REGISTER_COMPANY_ERROR
          )
        );
      });
  };
}

export function asyncGetCurrentProfile() {
  return function(dispatch) {
    return AuthService.getCurrentUser()
      .then(response => {
        if (response.status !== 401) {
          console.log("profile success");
          dispatch(getProfileSuccess(response.data));
        } else {
          dispatch(push("/login"));
        }
      })
      .catch(error => {
        console.log("profile error");
        if (error.response.status !== 500) {
          dispatch(makeActionCreator(USER_GET_ERROR));
          clearToken();
        }
      });
  };
}

export const asyncLogout = () => dispatch => {
  AuthService.logout();
  clearToken();
  dispatch(makeActionCreator(LOGOUT_SUCCESS));
};

export const asyncConfirmEmail = (token, email) => dispatch => {
  dispatch(makeActionCreator(EMAIL_CONFIRM_REQUEST))
  return AuthService.confirmEmail(token, email)
    .then(response => {
        storeToken(response.data.tokens, response.data.user);
        dispatch(makeActionCreator(EMAIL_CONFIRM_SUCCESS))
        dispatch(loginSuccess(response.data.user));
    })
    .catch(error => {
      dispatch(makeActionCreator(EMAIL_CONFIRM_ERROR));
      dispatch(
        returnErrors(
          error.response.data.message,
          error.status,
          EMAIL_CONFIRM_ERROR
        )
      );
    });
};
