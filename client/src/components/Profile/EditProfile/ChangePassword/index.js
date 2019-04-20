import { Formik } from "formik";
import React from "react";
import PasswordSchemaValid from "./PasswordSchemaValid";
import ChangePasswordForm from "./ChangePasswordForm";
import { Loader } from "../../../common/loading";

export function ChangePassword({ error,role, profile, changePassword, isLoading }) {
  const initialValues = {
    ...profile,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <main className="root__card-pass card-pass card_shadow">
      <h3>Смена пароля</h3>
      {error ? <p className='error-text'>{error}</p> : null}
      <Formik
        initialValues={{
          ...initialValues
        }}
        validationSchema={PasswordSchemaValid}
        onSubmit={values => {
          const { confirmPassword, error, ...profile } = values;
          changePassword({ ...profile }, role);
        }}
        component={ChangePasswordForm}
      />
    </main>
  );
}
