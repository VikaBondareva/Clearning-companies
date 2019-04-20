import { Formik } from "formik";
import React from "react";
import EditUserSchemaValid from "./EditUserSchemaValid";
import EditUserForm from "./EditProfileUser";

export function EditUser({ error,user,saveChanged }) {
  const initialValues = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    addresses: user.addresses,
    isNotify: user.isNotify,
    notVerifiedEmail: user.notVerifiedEmail
  };

  return (
    <Formik
      initialValues={{
        ...initialValues,
        actionName: "save",
        removeIndex: null,
        error
      }}
      validationSchema={EditUserSchemaValid}
      onSubmit={(values, { setValues }) => {
        const { actionName, removeIndex, error,...profile } = values;
        if (actionName === "save") saveChanged(profile);
        else if (actionName === "addAddress") {
          values.addresses.push("");
          setValues(values);
        } else if (actionName === "removeAddress") {
          if (values.addresses.length > 1) {
            values.addresses.pop(values.removeIndex);
            setValues(values);
          }
        }
      }}
      component={EditUserForm}
    />
  );
}
