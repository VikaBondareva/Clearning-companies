import{ string, object } from 'yup';

const LoginSchema = object().shape({
    identifier: string()
        .email()
        .required("Username is required"),
    password: string()
        .required("Enter your password")
        .min(6)
        .max(30)
        .matches(/^[a-zA-Z0-9]{6,30}$/)
})

export default LoginSchema;