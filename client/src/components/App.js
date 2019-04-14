import React from "react";
import { Route, Switch } from "react-router-dom";
import WithLayout from "./RouterWithLayout";
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
import {ChangePassword} from '../containers/forms';
import Home from "./Home/HomeComponent";
import NotFound from "./NotFound/NotFound";
import { PrivateRoute } from "./PrivateRoutes";
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
          component={WithLayout(Profile)}
          isAuth={isAuthenticated}
          pathUrl="/login"
        />
        <PrivateRoute
          path="/profile/edit"
          exact
          component={WithLayout(EditProfile)}
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
        {/* {role !== roles.executor && (
          <PrivateRoute
            path="/profile/edit/services"
            exact
            role={role}
            component={WithLayout(ProfileEditServices)}
            isAuth={isAuthenticated}
            pathUrl="/login"
          />
        )} */}
        <PrivateRoute
          path="/profile/orders"
          exact
          role={role}
          component={WithLayout(OrdersPage)}
          isAuth={isAuthenticated}
          pathUrl="/login"
        />
        <PrivateRoute
          path="/profile/orders/:id"
          role={role}
          component={WithLayout(OrdersDetails)}
          isAuth={isAuthenticated}
          pathUrl="/login"
        />

        {role === roles.admin && (
          <PrivateRoute
            path="/admin/users"
            component={WithLayout(ControlUsers)}
            isAuth={isAuthenticated}
            pathUrl="/login"
          />
        )}
        {role === roles.admin && (
          <PrivateRoute
            path="/admin/companies"
            component={WithLayout(ControlCompanies)}
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
