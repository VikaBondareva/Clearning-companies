import React from 'react';
import { Route, Switch } from "react-router-dom";

import WithLayout from './RouterWithLayout';
import {LoginPage,RegistrationCompany,RegistrationUser} from '../containers/auth';
import {Home,CompanyPage, Profile} from  '../containers/pages';
import NotFound from './NotFound/NotFound';
import ConfirmRegister from './Auth/ConfirmEmail/ConfirmEmail';
import {PrivateRoute} from './PrivateRoutes';
export default class App extends React.Component{

  render(){
    const {isAuthenticated} = this.props;
    return (
        <Switch>
          <Route path="/" exact component={WithLayout(Home)} />
          <Route path="/companies/:id" exact component={WithLayout(CompanyPage)} />

          <PrivateRoute  path="/profile" component={WithLayout(Profile)} isAuth={isAuthenticated} pathUrl='/login'/>

          <PrivateRoute path="/login" component={LoginPage} isAuth={!isAuthenticated} pathUrl='/profile' />
          <PrivateRoute path="/register" component={RegistrationUser} isAuth={!isAuthenticated} pathUrl='/profile'/>
          <PrivateRoute path="/register-company" component={RegistrationCompany} isAuth={!isAuthenticated} pathUrl='/profile'/>
          <Route path='/activation' component={ConfirmRegister}/>
          <Route path="/*" component={NotFound} />
      </Switch>
    );
  }
};