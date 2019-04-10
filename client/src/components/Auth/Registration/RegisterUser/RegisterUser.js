import { Formik } from 'formik';
import React from 'react';
import UserSchema from './UserSchema';
import RegisterUserFrom from './RegisterUserFrom'
import PropTypes from 'prop-types';
import loadingHOC from '../../../common/loading/loadingHOC';
import AuthPage from '../../AuthPage';

export default function RegisterUser(props){
    return (
        <AuthPage 
            title='Зарегестрироваться в качетсве пользователя'
            titleDown="У Вас уже есть аккаунт?"
            link='/login'
            size='big'
            isShowAuth={true}
            error={props.error}
            isSendEmail={props.isSendEmail}
            nameAction='Войти.'
            otherRegisterLink="/register-company"
            otherRegisterText="Зарегестрироваться как компания">
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    address: '',
                    password: '',
                    confirmPassword: '',
                }}   
                validationSchema={UserSchema}
                onSubmit={(values) => {
                    const { confirmPassword,...userWithoutConfPassword} = values;
                    const user  = getUser(userWithoutConfPassword);
                    props.registerUser(user);
                }}
                component= {RegisterUserFrom}
            />
        </AuthPage>
    );
}

function getUser(user){
    if(!user.phone)
        delete user.phone;
    else if (!user.email){
        delete user.email
    }
    console.log(user);
    return user;
}

RegisterUser.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSendEmail: PropTypes.bool,
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.string
  };

export const RegistrationUserComponent = loadingHOC('isLoading')(RegisterUser);

