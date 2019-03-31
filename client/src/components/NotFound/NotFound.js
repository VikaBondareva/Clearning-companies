import React from 'react';

export default function NotFound (props){

    return ( 
        <div>
            <p>Not found {props.match.url}</p>
        </div>
    );
}

