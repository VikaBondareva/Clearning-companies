import { string, object, ref, array, bool } from "yup";

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
    .matches(/\+375(29|33|44|25)\d{7}$/)
    .required("Enter is phone"),
  addresses: array(
    string()
      .required("Enter your address")
      .min(10)
  ).required(),
  isNotify: bool().required()
});

export default UserSchema;
