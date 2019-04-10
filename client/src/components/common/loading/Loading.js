import React from 'react';
import './loadingHOC.css';

export  function Loader({isSmall}){
    const classStyle = `loader ${isSmall ? "" : "loader_big"}`; 
    return (
        <div className={classStyle}/>
    )
}
