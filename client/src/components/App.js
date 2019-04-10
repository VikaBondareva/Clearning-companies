import React from 'react';
import { Route, Switch } from "react-router-dom";
import WithLayout from './RouterWithLayout';
import {LoginPage,RegistrationCompany,RegistrationUser, ConfirmEmail} from '../containers/auth';
import {CompanyPage, Profile,Booking,OrdersPage} from  '../containers/pages';
import Home from './Home/HomeComponent'
import NotFound from './NotFound/NotFound';
import {PrivateRoute} from './PrivateRoutes';
import {roles} from '../helpers';
export default class App extends React.Component{

  render(){
    const {isAuthenticated, role} = this.props;
    return (
        <Switch>
          <Route path="/companies" exact component={WithLayout(Home)} />
          <Route path="/companies/:id" exact component={WithLayout(CompanyPage)} />
         {role === roles.user && <Route path="/booking" exact component={WithLayout(Booking)} />}

          <PrivateRoute  path="/profile" exact role={role} component={ WithLayout(Profile)} isAuth={isAuthenticated} pathUrl='/login'/>
          <PrivateRoute  path="/profile/orders" exact role={role} component={ WithLayout(OrdersPage)} isAuth={isAuthenticated} pathUrl='/login'/>

          <PrivateRoute path="/login" component={LoginPage} isAuth={!isAuthenticated} pathUrl='/profile' />
          <PrivateRoute path="/register" component={RegistrationUser} isAuth={!isAuthenticated} pathUrl='/profile'/>
          <PrivateRoute path="/register-company" component={RegistrationCompany} isAuth={!isAuthenticated} pathUrl='/profile'/>
          <Route  path='/activation' component={ConfirmEmail}/>
          <Route path="/*" component={NotFound} />
      </Switch>
    );
  }
};