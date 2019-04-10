import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component,isAuth, pathUrl,role, ...rest }) => (
    <Route {...rest} render={ props => 
        isAuth
            ? <Component {...props} role={role} />
            : <Redirect to={{pathname: pathUrl, state: {from: props.location}}} />
        }
     />
)