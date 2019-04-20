import { Formik } from "formik";
import React, { Component } from "react";
import LoginSchema from "./LoginSchema";
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";
import AuthPage from "../AuthPage";
import loadingHOC from "../../common/loading/loadingHOC";
import { VerificationCode } from '../../../containers/forms';

export default class LoginPage extends Component {
  componentWillUnmount() {
    this.props.cleanError();
  }

  render() {
    const isSendCode = this.props.isSendCode;
    return (
      <AuthPage
        title="Вход в систему"
        titleDown="У вас нет аккаунта?"
        link="/register"
        isShowAuth={true}
        error={this.props.error}
        isSendEmail={this.props.isSendEmail}
        nameAction="Создать аккаунт."
      >
        <Formik
          initialValues={{
            identifier: "",
            password: "",
            isExecutor: false
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            this.props.login({
              identifier: values.identifier,
              password: values.password
            }, values.isExecutor);
          }}
          render={(props)=> <LoginForm {...props} isSendCode={isSendCode} />}
          // component={LoginForm}
        />
         {isSendCode && <VerificationCode />}
      </AuthPage>
    );
  }
}

LoginPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  cleanError: PropTypes.func,
  isSendCode: PropTypes.bool.isRequired,
  isSendEmail: PropTypes.bool.isRequired
};

export const LoginComponent = loadingHOC("isLoading")(LoginPage);
