import {
    string,
    object
} from 'yup';

const CompanySchema = object().shape({
    name: string()
        .required("Name is required")
        .min(4)
        .max(50),
    description: string()
        .required("Description is required")
        .min(4)
        .max(500),
    email: string()
        .required("Enter your email")
        .email(),
    address: string()
        .required("Enter your address")
        .min(10),
    password: string()
        .required("Enter your password")
        .min(6)
        .max(30)
        .matches(/^[a-zA-Z0-9]{6,30}$/),
    confirmPassword: string()
        .required('Password confirmation is required!')
        .test('password-match', "Passwords are not the same!", (value) => {
            return this.parent.password === value;
        })
})

export default CompanySchema;