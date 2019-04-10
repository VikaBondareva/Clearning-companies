import { Formik } from 'formik';
import React from 'react';
import BookingSchemaValid from './BookingSchemaValid';
import loadingHOC from '../common/loading/loadingHOC';
import BookingForm from './BookingForm'
import PropTypes from 'prop-types';
import {
    serviceTypes,
    daysSelect,
    regularityTypes,
    preliminaryCalculation,
    querySearch
} from '../../helpers'

function BookingFormComponent(props){

    const servicesCompany = props.company ? props.company.services : serviceTypes;
    const address =  props.userAddress? props.userAddress[0] :"";
    const previously = props.company ? true : false;
    const executor = props.company?  props.company._id : '';
    console.log(props);
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
                action: "",
                isAuth:props.isAuth,
                executor
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
                    const order = getOrder(values);
                    props.saveOrderStore(order);
                    props.createOrder(order)
                } else if (values.action === 'chooseCompany') {
                    const query = querySearch("",{services:values.services});
                    changeLocation(values, "/companies"+query, props)
                } else if(values.action === "login"){
                    changeLocation(values, "/login", props)
                }
            }}
            component= {BookingForm}
        />
    );
}  

function getOrder(values){
    const {regularityTypes,previously,recurrent,servicesCompany,daysSelect,action,time,price,isAuth, ...order } = values;
    const services = order.services.map((service)=>{
        return service.name
    });
    const days = order.days.map((day)=>{
        return day.name
    });
    order.services =services;
    order.days = days;
    return order;
}

function changeLocation(values, path, props){
    const order = getOrder(values);
    props.saveOrderStore(order);
    props.history.push('path');
}

BookingFormComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    userAddress: PropTypes.object,
    isAuth:  PropTypes.bool.isRequired,
    company: PropTypes.object
  };

export const BookingPage = loadingHOC('isLoading')(BookingFormComponent);