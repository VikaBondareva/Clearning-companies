import React from 'react';
import { Route, Switch } from "react-router-dom";

import RouterWithLayout from './RouterWithLayout';
import RegisterUser from '../containers/auth/RegisterContainer';
import Login from '../containers/auth/LoginContainer';
import Home from  '../containers/pages/HomeContainer';
import CompanyPage from './CompanyPage/CompanyPageComponent';
import NotFound from './NotFound/NotFound';
import ConfirmRegister from './Auth/ConfirmEmail/ConfirmEmail';
import RegisterCompany from '../containers/auth/RegisterCompanyContainer';
import {PrivateRoute} from './PrivateRoutes';

export default() => {

 
  return (
          <Switch>
            <Route path="/" exact component={RouterWithLayout(Home)} />
            <Route path="/companies/:id" exact component={RouterWithLayout(CompanyPage)} />

            <PrivateRoute  path="/profile" component={RouterWithLayout(CompanyPage)} />

            <Route path="/login"   component={Login} />
            <Route path="/register"   component={RegisterUser} />
            <Route path="/register-company" component={RegisterCompany} />
            <Route path='/activation' component={ConfirmRegister}/>
            <Route path="/*" component={NotFound} />
        </Switch>
  );
};