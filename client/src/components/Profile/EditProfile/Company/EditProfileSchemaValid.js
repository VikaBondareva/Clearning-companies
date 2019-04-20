import { string, object, array, number } from "yup";

const EditCompanySchema = object().shape({
  name: string()
    .required("Enter is name")
    .min(3)
    .max(20),
  description: string()
    .required("Enter is surname")
    .min(30),
  email: string()
    .email()
    .required("Enter is email"),
  address: string()
    .required("Enter your address")
    .min(10),
  workPlan: array()
    .of(
      object().shape({
        day: number()
          .required()
          .min(0)
          .max(6)
          .typeError(),
        start: string().required(),
        end: string().required()
      })
    ),
  services: array()
    .of(
      object().shape({
        name: string().required(),
        coefficient: number()
          .positive()
          .typeError()
          .required()
      })
    )
    .min(1)
    .required(),
  rooms:  object().shape({
      toilet: object().shape({
        price: number()
          .required()
          .min(0),
        time: number()
          .required()
          .min(0)
      }),
      standart: object().shape({
        price: number()
          .required()
          .min(0),
        time: number()
          .required()
          .min(0)
      }),
      big: object().shape({
        price: number()
          .required()
          .min(0),
        time: number()
          .required()
          .min(0)
      })
    })
});

export default EditCompanySchema;
