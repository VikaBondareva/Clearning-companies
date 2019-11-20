import { Formik } from 'formik';
import React from 'react';
import RoomsInformationSchema from './RoomsInformationSchema';
import RoomsInformationForm from './RoomsInformationForm'
import PropTypes from 'prop-types';

export function RoomsInformation(props){
    let toilet = {
        price: '',
        time: ''
    };
    let standart = {
        price: '',
        time: ''
    };
    let big = {
        price: '',
        time: ''
    }
    if(props.company && props.company.rooms){
        toilet = props.company.rooms.toilet;
        standart = props.company.rooms.standart;
        big = props.company.rooms.big;
    } 
    return (
            <Formik
                initialValues={{
                    toilet,
                    standart,
                    big,
                    isNext: false
                }}   
                validationSchema={RoomsInformationSchema}
                onSubmit={(values) => {
                    const {isNext,...data} = values;
                    if(values.isNext)
                    {
                        props.handleNext(data);
                    } else {
                        props.handleBack(data)
                    }
                }}
                component={RoomsInformationForm}
            />
    );
}

RoomsInformation.propTypes = {
    handleNext: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
};
