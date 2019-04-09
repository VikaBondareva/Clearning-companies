import React from 'react';
import { Route, Switch } from "react-router-dom";
import WithLayout from './RouterWithLayout';
import {LoginPage,RegistrationCompany,RegistrationUser, ConfirmEmail} from '../containers/auth';
import {CompanyPage, Profile,Booking} from  '../containers/pages';
import Home from './Home/HomeComponent'
import NotFound from './NotFound/NotFound';
import {PrivateRoute, Authorization} from './PrivateRoutes';

const Customer = Authorization('customer')
const Executor = Authorization("executor")
const Admin = Authorization('admin')

export default class App extends React.Component{

  render(){
    const {isAuthenticated} = this.props;
    return (
        <Switch>
          <Route path="/companies" exact component={WithLayout(Home)} />
          <Route path="/companies/:id" exact component={WithLayout(CompanyPage)} />
          <Route path="/booking" exact component={WithLayout(Booking)} />

          <PrivateRoute  path="/profile" component={ WithLayout(Profile)} isAuth={isAuthenticated} pathUrl='/login'/>

          <PrivateRoute path="/login" component={LoginPage} isAuth={!isAuthenticated} pathUrl='/profile' />
          <PrivateRoute path="/register" component={RegistrationUser} isAuth={!isAuthenticated} pathUrl='/profile'/>
          <PrivateRoute path="/register-company" component={RegistrationCompany} isAuth={!isAuthenticated} pathUrl='/profile'/>
          <Route  path='/activation' component={ConfirmEmail}/>
          <Route path="/*" component={NotFound} />
      </Switch>
    );
  }
};