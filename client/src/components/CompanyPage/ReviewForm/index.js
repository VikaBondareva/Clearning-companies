import { Formik } from 'formik';
import React, {Component} from 'react';
import ReviewSchema from './ReviewSchemaValid';
import ReviewFormComponent from './ReviewForm'
import PropTypes from 'prop-types';

export function ReviewForm(props){

    return (
        <Formik
            initialValues={{
                ratting: 0,
                reviewText: '',
                isAuth: props.isAuth
            }}   
            validationSchema={ReviewSchema}
            onSubmit={(values) => {
                console.log("ratting: "+values.ratting+" text: "+values.reviewText)
                const {ratting, reviewText} = values;
                props.onClick(ratting, reviewText);
            }}
            component= {ReviewFormComponent}
        />
    );
}

ReviewForm.propTypes = {
    cleanError: PropTypes.func,
    onClick: PropTypes.func.isRequired
};
