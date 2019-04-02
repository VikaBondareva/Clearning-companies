import {
    string,
    object
} from 'yup';

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
        .required("Enter your email")
        .email(),
    phone: string()
        .when('email', {
            is: '',
            then: string().required("Enter your phone").matches(/^(\+375|80)(29|25|44|33)\d{7}$/),
            otherwise: string().matches(/^(\+375|80)(29|25|44|33)\d{7}$/)
        }),
    address: string()
        .required("Enter your address")
        .min(10),
    password: string()
        .required("Enter your password")
        .min(6)
        .max(30)
        .matches(/^[a-zA-Z0-9]{6,30}$/),
    confirmPassword: string()
        .test('password-match', "Passwords are not the same!", (value) => {
            return this.parent.password === value;
        })
        .required('Password confirmation is required!'),
})

export default UserSchema;