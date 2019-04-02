import{ string, object } from 'yup';

const LoginSchema = object().shape({
    identifier: string()
        .required("Username is required")
        .min(4)
        .max(50),
    password: string()
        .required("Enter your password")
        .min(6)
        .max(30)
        .matches(/^[a-zA-Z0-9]{6,30}$/)
})

export default LoginSchema;