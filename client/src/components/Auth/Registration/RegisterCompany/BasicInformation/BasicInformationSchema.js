import {
    string,
    object,
    ref
} from 'yup';

const CompanySchema = object().shape({
    name: string()
        .required()
        .min(4)
        .max(50),
    description: string()
        .required()
        .min(4)
        .max(500),
    email: string()
        .required()
        .email(),
    address: string()
        .required()
        .min(10),
    password: string()
        .required()
        .min(6)
        .max(30)
        .matches(/^[a-zA-Z0-9]{6,30}$/),
    confirmPassword: string()
        .required()
        .oneOf([ref('password')])
})

export default CompanySchema;