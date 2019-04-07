import { Formik } from 'formik';
import React, {Component} from 'react';
import LoginSchema from './LoginSchema';
import LoginForm from './LoginForm'
import PropTypes from 'prop-types';
import AuthPage from '../AuthPage';
import loadingHOC from '../../common/loading/loadingHOC';

export default class LoginPage extends Component{

    componentWillUnmount(){
        this.props.cleanError();
    }

    render(){
        return (
            <AuthPage 
                title='Sign in to Mega Clean'
                titleDown="You have not account?"
                link='/register'
                isShowAuth={true}
                error={this.props.error}
                isSendEmail={this.props.isSendEmail}
                nameAction='Create an account.'>
                <Formik
                    initialValues={{
                        identifier: '',
                        password: '',
                    }}   
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        this.props.login({
                            identifier:values.identifier,
                            password:values.password
                        });
                    }}
                    component= {LoginForm}
                />
            </AuthPage>
        );
    }
}

LoginPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.string,
    cleanError: PropTypes.func,
    isSendEmail: PropTypes.bool.isRequired,
  };

export const LoginComponent = loadingHOC('isLoading')(LoginPage);

