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
        .min(50)
        .max(500),
    email: string()
        .required()
        .email(),
    address: object().shape({
        country: string().required(),
        city: string().required(),
        other: string().required()
    }),
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