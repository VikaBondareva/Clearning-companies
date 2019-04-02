import { Formik } from 'formik';
import React from 'react';
import CompanySchema from './CompanySchema';
import RegisterCompanyForm from './RegisterCompanyForm'
import PropTypes from 'prop-types';
import loadingHOC from '../../../common/loading/loadingHOC';
import AuthPage from '../../AuthPage';

export default function RegisterCompany(props){
    return (
        <AuthPage 
            title='Sign up to Mega Clean'
            titleDown="You have an account?"
            link='/login'
            size='big'
            error={props.message}
            isSendEmail={props.isSendEmail}
            nameAction='Sing in.'
            otherRegisterLink="/register"
            otherRegisterText="Registration as an user">
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    email: '',
                    address: '',
                    password: '',
                    confirmPassword: ''
                }}   
                validationSchema={CompanySchema}
                onSubmit={(values) => {
                    const {confirmPassword,...company} = values;
                    props.registerCompany(company);
                }}
                component= {RegisterCompanyForm}
            />
        </AuthPage>
    );
}

RegisterCompany.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registerCompany: PropTypes.func.isRequired,
    isSendEmail: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
  };

export const RegistrationCompanyComponent = loadingHOC('isLoading')(RegisterCompany);

