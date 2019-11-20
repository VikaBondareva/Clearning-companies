import React from 'react';
import './style.css';

export default function NotFound (props){

    return ( 
        <div className="not-found">
                 <h1 >500 Server expression</h1>
                <p>{props.error || 'Something be wrong'}</p>
        </div>
    );
}

