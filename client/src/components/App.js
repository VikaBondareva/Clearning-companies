import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  LoginPage,
  RegistrationCompany,
  RegistrationUser,
  ConfirmEmail
} from "../containers/auth";
import {
  CompanyPage,
  Profile,
  Booking,
  OrdersPage,
  OrdersDetails,
  ControlUsers,
  ControlCompanies,
  EditProfile
} from "../containers/pages";
import { ChangePassword, UploadLogo } from "../containers/forms";
import Home from "./Home/HomeComponent";
import NotFound from "./NotFound/NotFound";
import { PrivateRoute, WithLayout, ProfileWithLayout } from "./RoutesHOC";
import { roles } from "../utils";

export default class App extends React.Component {
  render() {
    const { isAuthenticated, role } = this.props;
    return (
      <Switch>
        <Route path="/companies" exact component={WithLayout(Home)} />
        <Route
          path="/companies/:id"
          exact
          component={WithLayout(CompanyPage)}
        />
        {role !== roles.executor && (
          <Route path="/booking" exact component={WithLayout(Booking)} />
        )}

        <PrivateRoute
          path="/profile"
          exact
          role={role}
          component={ProfileWithLayout(Profile)}
          isAuth={isAuthenticated}
          pathUrl="/login"
        />
        <PrivateRoute
          path="/profile/edit"
          exact
          role={role}
          component={ProfileWithLayout(EditProfile)}
          isAuth={isAuthenticated}
          pathUrl="/login"
        />
        <PrivateRoute
          path="/profile/edit/password"
          exact
          component={ChangePassword}
          isAuth={isAuthenticated}
          pathUrl="/login"
        />
        {role && role !== roles.admin && (
          <PrivateRoute
            path="/profile/orders"
            exact
            role={role}
            component={ProfileWithLayout(OrdersPage)}
            isAuth={isAuthenticated}
            pathUrl="/login"
          />
        )}
        {role === roles.executor && (
          <PrivateRoute
            path="/profile/orders/:id"
            role={role}
            component={ProfileWithLayout(OrdersDetails)}
            isAuth={isAuthenticated}
            pathUrl="/login"
          />
        )}
        {role === roles.executor && (
          <PrivateRoute
            path="/profile/edit/logo"
            role={role}
            component={ProfileWithLayout(UploadLogo)}
            isAuth={isAuthenticated}
            pathUrl="/login"
          />
        )}


        {role === roles.admin && (
          <PrivateRoute
            path="/admin/users"
            role={role}
            component={ProfileWithLayout(ControlUsers)}
            isAuth={isAuthenticated}
            pathUrl="/login"
          />
        )}
        {role === roles.admin && (
          <PrivateRoute
            path="/admin/companies"
            role={role}
            component={ProfileWithLayout(ControlCompanies)}
            isAuth={isAuthenticated}
            pathUrl="/login"
          />
        )}

        <PrivateRoute
          path="/login"
          component={LoginPage}
          isAuth={!isAuthenticated}
          pathUrl="/profile"
        />
        <PrivateRoute
          path="/register"
          component={RegistrationUser}
          isAuth={!isAuthenticated}
          pathUrl="/profile"
        />
        <PrivateRoute
          path="/register-company"
          component={RegistrationCompany}
          isAuth={!isAuthenticated}
          pathUrl="/profile"
        />
        <Route path="/activation" component={ConfirmEmail} />
        <Route path="/*" component={NotFound} />
      </Switch>
    );
  }
}
