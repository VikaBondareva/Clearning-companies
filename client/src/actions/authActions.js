import {
  AUTH_REQUEST,
  AUTH_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  SAVE_COMPANY_REGISTER,
  EMAIL_CONFIRM_ERROR,
  EMAIL_CONFIRM_REQUEST,
  EMAIL_CONFIRM_SUCCESS,
  SEND_EMAIL_DELETE,
  SEND_SUCCESS_EMAIL,
  SAVE_EMAIL_STORE
} from "./actionTypes";
import { AuthService } from "../services";
import { storeTokenUser, clearToken } from "../utils/authentication";
import { history, roles } from "../utils";
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

export const saveEmailStore = email => ({
  type: SAVE_EMAIL_STORE,
  payload: {
    email
  }
})


//redax-thunk
export function asyncLogin({ identifier, password },isExecutor) {
  return function(dispatch) {
    dispatch(makeActionCreator(AUTH_REQUEST));
    return AuthService.login({ identifier, password })
      .then(async response => {
        console.log(response.status);
        await storeTokenUser(response.data.tokens,response.data.user);
        dispatch(loginSuccess(response.data.user));
        if(response.data.user.role !== roles.admin){
          dispatch(push("/profile/orders"));
        } else dispatch(push("/profile"));
        dispatch(clearErrors())
        // if (history.length > 1) {
        //   dispatch(goBack());
        // } else {
        //   dispatch(push("/profile"));
        // }
      })
      .catch(async error => {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          await dispatch(makeActionCreator(AUTH_ERROR));
          dispatch(
            returnErrors(
              error.response.data.message
            )
          );
        } else {
          await dispatch(makeActionCreator(AUTH_ERROR));
          if(isExecutor){
            await dispatch(makeActionCreator(SEND_SUCCESS_EMAIL));
          } else  await dispatch(saveEmailStore(identifier));
          dispatch(
            returnErrors(
              error.response.data.message
            )
          );
        }
      });
  };
}

export function asyncRegisterUser(user, role) {
  return function(dispatch) {
    dispatch(makeActionCreator(AUTH_REQUEST));
    return AuthService.registration(user, role)
      .then(() => {
        dispatch(makeActionCreator(REGISTER_SUCCESS));
        dispatch(clearErrors())
        if(role === roles.user) {
          dispatch(saveEmailStore(user.email));
        } else {
           dispatch(makeActionCreator(SEND_SUCCESS_EMAIL));
        }
      })
      .catch(error => {
        dispatch(makeActionCreator(AUTH_ERROR));
        dispatch(
          returnErrors(
            error.response.data.message
          )
        );
      });
  };
}

export const asyncLogout = () => dispatch => {
  AuthService.logout();
  clearToken();
  dispatch(makeActionCreator(LOGOUT_SUCCESS));
};

export const asyncConfirmEmail = ({token, email, verificationCode}, role) => dispatch => {
  dispatch(makeActionCreator(EMAIL_CONFIRM_REQUEST))
  return AuthService.confirmEmail({token, email, verificationCode},role)
    .then(async response => {
        await storeTokenUser(response.data.tokens,response.data.user);
        dispatch(makeActionCreator(EMAIL_CONFIRM_SUCCESS))
        dispatch(loginSuccess(response.data.user));
    })
    .catch(error => {
      dispatch(makeActionCreator(EMAIL_CONFIRM_ERROR));
      dispatch(
        returnErrors(
          error.response.data.message
        )
      );
    });
};

export const asyncSendNewVerificationCode = email => dispatch => {
  dispatch(makeActionCreator(EMAIL_CONFIRM_REQUEST))
  return AuthService.createNewCode(email)
    .then(response => {
        dispatch(makeActionCreator(SEND_SUCCESS_EMAIL));
        dispatch(makeActionCreator(EMAIL_CONFIRM_SUCCESS))
    })
    .catch(error => {
      dispatch(makeActionCreator(EMAIL_CONFIRM_ERROR));
      dispatch(
        returnErrors(
          error.response.data.message
        )
      );
    });
}

export const asyncRefreshToken = () => dispatch => {
  dispatch(makeActionCreator("TOKEN_REFRESH_REQUEST"))
  return AuthService.refreshToken()
    .then(async (response)=> {
      await storeTokenUser(response.data.tokens,response.data.user);
      dispatch(makeActionCreator("TOKEN_REFRESH_SUCCESS"))
    })
    .catch(()=>{
      dispatch(makeActionCreator("TOKEN_REFRESH_ERROR"))
    })
};
