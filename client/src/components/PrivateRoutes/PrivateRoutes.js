import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component,isAuth, pathUrl, ...rest }) => (
    <Route {...rest} render={ props => 
        isAuth
            ? <Component {...props} />
            : <Redirect to={{pathname: pathUrl, state: {from: props.location}}} />
        }
     />
)