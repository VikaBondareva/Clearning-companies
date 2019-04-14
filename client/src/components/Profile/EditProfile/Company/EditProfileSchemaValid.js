import { string, object} from "yup";

const EditCompanySchema = object().shape({
  name: string()
    .required("Enter is name")
    .min(3)
    .max(20),
  description: string()
    .required("Enter is surname")
    .min(30)
    .max(9999),
  email: string()
    .email()
    .required("Enter is email"),
  //   phone: string()
  //     .matches(/\+375(29|33|44|25)\d{7}$/)
  //     .required("Enter is phone"),
  address: string()
    .required("Enter your address")
    .min(10)
});

export default EditCompanySchema;
