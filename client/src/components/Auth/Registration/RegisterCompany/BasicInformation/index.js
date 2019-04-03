import { Formik } from 'formik';
import React from 'react';
import BasicInformationSchema from './BasicInformationSchema';
import BasicInformationForm from './BasicInformationForm'
import PropTypes from 'prop-types';

export function BasicInformation(props){
    let initialValues = {
        name: "",
        description:  '',
        email: '',
        address:  '',
        password:  '',
        confirmPassword: ''
    }
    const {company} = props;
    if (company.personal){
        const {name, description, email, address, password} = company.personal;
        initialValues = {
            name,
            description,
            email,
            address,
            password,
            confirmPassword: ''
        }
    } 
    
    return (
            <Formik
                initialValues={initialValues}   
                validationSchema={BasicInformationSchema}
                onSubmit={(values) => {
                    const {confirmPassword,...company} = values;
                    props.handleNext(company);
                }}
                component= {BasicInformationForm}
            />
    );
}

BasicInformation.propTypes = {
    handleNext: PropTypes.func.isRequired,
};

