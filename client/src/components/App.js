import React from 'react';
import { Route, Switch } from "react-router-dom";

import WithLayout from './RouterWithLayout';
import {LoginPage,RegistrationCompany,RegistrationUser} from '../containers/auth';
import {Home,CompanyPage, Profile} from  '../containers/pages';
import NotFound from './NotFound/NotFound';
import ConfirmRegister from './Auth/ConfirmEmail/ConfirmEmail';
import {PrivateRoute, NotAuthRouter} from './PrivateRoutes';

export default() => {
  return (
          <Switch>
            <Route path="/" exact component={WithLayout(Home)} />
            <Route path="/companies/:id" exact component={WithLayout(CompanyPage)} />

            <PrivateRoute  path="/profile" exact component={WithLayout(Profile)} />

            <NotAuthRouter path="/login"   component={LoginPage} />
            <NotAuthRouter path="/register"   component={RegistrationUser} />
            <NotAuthRouter path="/register-company" component={RegistrationCompany} />
            <Route path='/activation' component={ConfirmRegister}/>
            <Route path="/*" component={NotFound} />
        </Switch>
  );
};