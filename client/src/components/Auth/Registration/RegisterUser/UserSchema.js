import { string, object, ref } from "yup";

const UserSchema = object().shape({
  name: string()
    .required("Enter is name")
    .min(3)
    .max(20),
  surname: string()
    .required("Enter is surname")
    .min(4)
    .max(20),
  email: string()
    .email()
    .required("Enter is email"),
  phone: string()
    .matches(/\+375(29|33|44|25)\d{7}$/),
  // address: string()
  //   .required("Enter your address")
  //   .min(10),
  password: string()
    .required("Enter your password")
    .min(6)
    .max(30)
    .matches(/^[a-zA-Z0-9]{6,30}$/),
  confirmPassword: string()
    .required()
    .oneOf([ref("password")])
});

export default UserSchema;
