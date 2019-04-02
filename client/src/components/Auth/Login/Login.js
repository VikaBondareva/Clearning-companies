import { Formik } from 'formik';
import React from 'react';
import LoginSchema from './LoginSchema';
import LoginForm from './LoginForm'
import PropTypes from 'prop-types';
import AuthPage from '../AuthPage';
import loadingHOC from '../../common/loading/loadingHOC';

export default function LoginPage(props){
    return (
        <AuthPage 
            title='Sign in to Mega Clean'
            titleDown="You have not account?"
            link='/register'
            error={props.message}
            nameAction='Create an account.'>
            <Formik
                initialValues={{
                    identifier: '',
                    password: '',
                }}   
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    props.login({
                        identifier:values.identifier,
                        password:values.password
                    });
                }}
                component= {LoginForm}
            />
        </AuthPage>
        
    );
}

LoginPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
  };

export const LoginComponent = loadingHOC('isLoading')(LoginPage);

