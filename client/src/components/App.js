import React from 'react';
import { Route, Switch } from "react-router-dom";
import Footer from './Footer/Footer';
import Header from './Header/HeaderComponent';
import './App.css'
import PropTypes from 'prop-types';
import {PrivateRoute} from './PrivateRoutes';
import Home from './Home/HomeComponent';
import CompanyPage from './CompanyPage/CompanyPageComponent';


const App  = ()=>{
  return (
    <div>
        <Header/>
        <main className="main">
              <Switch>
                 <Route component={Home} />
                 <PrivateRoute  path="/profile" component={Home} />
                 <Route path="/companies/:id" component={CompanyPage}/>
              </Switch>
        </main>
        <Footer/>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;