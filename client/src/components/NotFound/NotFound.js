import React from 'react';
import './style.css';

export default function NotFound (props){

    return ( 
        <div className="not-found">
                 <h1 >404</h1>
                <p>This resource cannot be found {props.url || props.match.url}.</p>
        </div>
    );
}

