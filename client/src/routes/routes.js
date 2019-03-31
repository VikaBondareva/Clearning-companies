import React from 'react';
import { Route, Switch } from "react-router-dom";

import App from '../components/App';
import RegisterUser from '../containers/auth/RegisterContainer';
import Login from '../containers/auth/LoginContainer';

import NotFound from '../components/NotFound/NotFound';
import ConfirmRegister from '../components/Auth/ConfirmEmail/ConfirmEmail';
import RegisterCompany from '../containers/auth/RegisterCompanyContainer';

export default() => {
//   const requireLogin = (nextState, replace, cb) => {
//     function checkAuth() {
//       const { auth: { user }} = store.getState();
//       if (!user) {
//         // oops, not logged in, so can't be here!
//         replace('/');
//       }
//       cb();
//     }

//     if (!isAuthLoaded(store.getState())) {
//       store.dispatch(loadAuth()).then(checkAuth);
//     } else {
//       checkAuth();
//     }
//   };
 
  return (
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/login"   component={Login} />
            <Route path="/register"   component={RegisterUser} />
            <Route path="/register-company" component={RegisterCompany} />
            <Route path='/activation' component={ConfirmRegister}/>
            <Route path="/*" component={NotFound} />
        </Switch>
  );
};