import { Formik } from 'formik';
import React from 'react';
import ServicesInformationSchema from './ServicesInformationSchema';
import ServicesInformationForm from './ServicesInformationForm'
import PropTypes from 'prop-types';
import {serviceTypes} from '../../../../../utils';

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
                    actionName: 'add',
                    serviceTypes,
                    removeIndex: null
                }}   
                validationSchema={ServicesInformationSchema}
                onSubmit={ (values, {setValues}) => {
                    console.log("submit, isNext : " +values.actionName+" index: ")
                    const {actionName,...services} = values;
                    if(values.actionName === "register"){
                        props.handleFinish(services);
                    } else  if(values.actionName === "back"){
                        props.handleBack(services)
                    } else  if(values.actionName === "add"){
                        // const types = setServicesTypes(values.services, serviceTypes);
                        // values.serviceTypes = types;
                        values.services.push({name: '', coefficient: ''});
                        setValues(values);
                    } else if (values.actionName === 'remove'){
                        if(values.services.length!==1) {
                            values.services.pop(values.removeIndex); 
                            // const types = setServicesTypes(values.services, serviceTypes);
                            // values.serviceTypes = types;
                            setValues(values); 
                        }
                    }
                }}
                component= {ServicesInformationForm}
            />
    );
}

function setServicesTypes (services, serviceTypes){
    let result = serviceTypes.filter(type=>{
        return services.find(value=> value.name !==type.name)
     })
    return result
}

ServicesInformation.propTypes = {
    handleFinish: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
  };
