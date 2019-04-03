import { Formik } from 'formik';
import React from 'react';
import ServicesInformationSchema from './ServicesInformationSchema';
import ServicesInformationForm from './ServicesInformationForm'
import PropTypes from 'prop-types';

export function ServicesInformation(props){
    let services = [
        {
            name: '',
            coefficient: ''
        }
    ];
    if (props.company.services){
        services = props.company.services;
    } 

    return (
            <Formik
                initialValues={{
                    services,
                    actionName: 'add'
                }}   
                validationSchema={ServicesInformationSchema}
                onSubmit={(values, {setValues}) => {
                    console.log("submit, isNext : " +values.actionName+" index: ")
                    const {actionName,...services} = values;
                    if(values.actionName === "register")
                    {
                        props.handleFinish(services);
                    } else  if(values.actionName === "back"){
                        props.handleBack(services)
                    } else  if(values.actionName === "add"){
                        values.services.push({name: '', coefficient: ''});
                        setValues(values);
                    } else if (values.actionName === 'remove'){
                        values.services.pop(); 
                        setValues(values); 
                    }
                }}
                component= {ServicesInformationForm}
            />
    );
}

ServicesInformation.propTypes = {
    handleFinish: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
  };
