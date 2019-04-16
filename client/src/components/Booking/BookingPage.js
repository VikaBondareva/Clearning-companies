import { Formik } from "formik";
import React from "react";
import BookingSchemaValid from "./BookingSchemaValid";
import loadingHOC from "../common/loading/loadingHOC";
import BookingForm from "./BookingForm";
import PropTypes from "prop-types";
import {Loader } from '../common/loading';
import {
  serviceTypes,
  daysSelect,
  regularityTypes,
  preliminaryCalculation,
  querySearch
} from "../../utils";

function BookingFormComponent(props) {

  let selectName = '_id';
  let servicesCompany = serviceTypes;
  if(props.company){
    servicesCompany = props.company.services;
    selectName ="coefficient"
  }
  const address = props.userAddress ? props.userAddress[0] : "";
  const previously = props.company ? true : false;
  const executor = props.company ? props.company._id : "";
  let isConfirm = false;
  let initialOrder = {};
  if (props.order) {
      isConfirm = true;
    initialOrder = props.order;
    initialOrder.service= findServices(initialOrder.service,servicesCompany);
  } else {
    initialOrder = {
      address,
      countRooms: {
        toilet: 0,
        standart: 0,
        big: 0
      },
      date: "",
      days: [],
      regularity: 0,
      startTime: "07:30",
      service:{}
    };
  }
  console.log(props);

  if(props.isLoading){
      return <Loader/>;
  }

  return (
    <Formik
      initialValues={{
        ...initialOrder,
        price: 0,
        time: 0,
        regularityTypes,
        servicesCompany,
        selectName,
        recurrent: false,
        previously,
        daysSelect,
        action: "",
        isConfirm,
        isAuth: props.isAuth,
        executor
      }}
      validationSchema={BookingSchemaValid}
      onSubmit={(values, { setFieldValue }) => {
        console.log(values);
        if (values.action === "pricing") {
          if (props.company) {
            const { price, time } = preliminaryCalculation(
              props.company.rooms,
              values.countRooms,
              values.service.coefficient
            );
            setFieldValue("time", time);
            setFieldValue("price", price);
          } else {
            console.log("Not company");
          }
        } else if (values.action === "create") {
          console.log("Create order");
          let order = getOrderSaveStore(values);
          props.saveOrderStore(order);
          order = getOrder(values);
          props.createOrder(order);
        } else if (values.action === "chooseCompany") {
          const query = querySearch("", { services: values.service.name });
          changeLocation(values, "/companies" + query, props);
        } else if (values.action === "login") {
          changeLocation(values, "/login", props);
        }
      }}
      component={BookingForm}
    />
  );
}

function getOrderSaveStore(values) {
  const {
    regularityTypes,
    previously,
    recurrent,
    servicesCompany,
    daysSelect,
    selectName,
    action,
    time,
    price,
    isAuth,
    isConfirm,
    ...order
  } = values;
  
  return order;
}

function getOrder(values){
  const order = getOrderSaveStore(values);
  order.service = order.service.name;
  order.regularity = order.regularity._id;
  return order;
}

function changeLocation(values, path, props) {
  const order = getOrderSaveStore(values);
  props.saveOrderStore(order);
  props.history.push(path);
}

function findServices(serviceSelect, servicesCompany){
  const services = servicesCompany.filter(serv=> serv.name === serviceSelect.name);
  return services[0];
}

BookingFormComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  userAddress: PropTypes.object,
  isAuth: PropTypes.bool.isRequired,
  company: PropTypes.object
};

export const BookingPage = loadingHOC("isLoading")(BookingFormComponent);
