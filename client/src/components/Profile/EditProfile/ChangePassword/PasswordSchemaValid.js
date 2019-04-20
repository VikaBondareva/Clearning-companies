import { string, object, ref } from "yup";

const PasswordsSchema = object().shape({
  oldPassword: string()
    .required()
    .min(6)
    .max(30)
    .matches(/^[a-zA-Z0-9]{6,30}$/),
  newPassword: string()
    .required()
    .min(6)
    .max(30)
    .notOneOf([ref("oldPassword")])
    .matches(/^[a-zA-Z0-9]{6,30}$/),
  confirmPassword: string()
    .required()
    .oneOf([ref("newPassword")])
});

export default PasswordsSchema;
