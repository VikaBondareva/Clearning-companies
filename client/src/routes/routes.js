import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createBrowserHistory } from 'history';
import Header from '../components/Header/HeaderComponent';
import RegisterCompany from '../components/Auth/Registration/Registration';
import Login from '../components/Auth/Login/Login';
import Home from '../components/Home/HomeComponent';
import CompanyPage from '../components/CompanyPage/CompanyPageComponent';

const history = createBrowserHistory();

export default () => {
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
    <Router history={history}>
        <Header/>
        <Switch>

            <Route path="/"  exact component={Home} />
            <Route path="/login"  exact component={Login} />
            <Route path="/register"  exact component={RegisterCompany} />

            {/* <Route path="/*" component={<h2>Error not found</h2>} /> */}
            <Route path="/companies/:id" component={CompanyPage}/>
        </Switch>
           

        {/* <Route onEnter={requireLogin}>
            <Route path="profile" component={Profile}/>
            <Route path="loginSuccess" component={LoginSuccess}/>
        </Route> */}

        {/* <Route path="about" component={About}/>
        <Route path="booking" component={Booking}/> */}

    </Router>
  );
};