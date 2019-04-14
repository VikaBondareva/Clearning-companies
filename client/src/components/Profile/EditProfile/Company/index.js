import { Formik } from "formik";
import React from "react";
import EditProfileSchemaValid from "./EditProfileSchemaValid";
import EditProfileCompany from "./EditProfileCompany";

export function EditCompany({ error, company, saveChanged }) {
  return (
    <Formik
      initialValues={{
        ...company,
        error
      }}
      validationSchema={EditProfileSchemaValid}
      onSubmit={values => {
        const { error, ...profile } = values;
        saveChanged(profile);
      }}
      component={EditProfileCompany}
    />
  );
}
