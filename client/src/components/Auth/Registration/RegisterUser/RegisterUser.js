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
            title='Sign up to Mega Clean'
            titleDown="You have an account?"
            link='/login'
            size='big'
            isShowAuth={true}
            error={props.error}
            isSendEmail={props.isSendEmail}
            nameAction='Sing in.'
            otherRegisterLink="/register-company"
            otherRegisterText="Registration as a company">
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
                    const { confirmPassword,...user} = values;
                    props.registerUser(user);
                }}
                component= {RegisterUserFrom}
            />
        </AuthPage>
    );
}

RegisterUser.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSendEmail: PropTypes.bool,
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.string
  };

export const RegistrationUserComponent = loadingHOC('isLoading')(RegisterUser);

