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
                title='Вход в систему'
                titleDown="У вас нет аккаунта?"
                link='/register'
                isShowAuth={true}
                error={this.props.error}
                isSendEmail={this.props.isSendEmail}
                nameAction='Создать аккаунт.'>
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

