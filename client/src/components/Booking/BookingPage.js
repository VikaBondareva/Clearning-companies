import { Formik } from 'formik';
import React from 'react';
import BookingSchemaValid from './BookingSchemaValid';

import BookingForm from './BookingForm'
import PropTypes from 'prop-types';
import {
    serviceTypes,
    daysSelect,
    regularityTypes,
    preliminaryCalculation,
    querySearch
} from '../../helpers'

export  function BookingPage(props){

    const servicesCompany = props.company ? props.company.services : serviceTypes;
    const address = props.user ? props.user.addresses[0] : "";
    const previously = props.company ? true : false;

    return (
        <Formik
            initialValues={{
                address, 
                recurrent: false,
                countRooms: {
                    toilet: 0,
                    standart: 0,
                    big: 0
                },
                date: "",
                days: [],
                regularity: 0,
                recurrent:  false,
                regularityTypes,
                startTime: "07:30",
                services: [],
                price: 0,
                time: 0,
                servicesCompany,
                previously,
                daysSelect,
                action: ""
            }}   
            validationSchema={BookingSchemaValid}
            onSubmit={(values, {setFieldValue}) => {
                console.log(values);
                if(values.action === 'pricing'){
                    if(props.company){
                       const {price, time} = preliminaryCalculation(props.company.rooms, values.countRooms, values.services);
                       setFieldValue("time", time);
                       setFieldValue("price", price);
                    }else {
                        console.log("Not company");
                    }
                } else if (values.action === 'create'){
                    console.log("Create order");
                } else if (values.action === 'chooseCompany') {
                    const order = getOrder(values);
                    props.saveOrderStore(order);
                    const query = querySearch("",{services:values.services});
                    props.history.push('/companies'+query);
                }
            }}
            component= {BookingForm}
        />
    );
}  

function getOrder(values){
    const {regularityTypes,previously,servicesCompany,daysSelect,action,time,price, ...order } = values;
    return order;
}

BookingPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    user: PropTypes.object,
    company: PropTypes.object
  };

