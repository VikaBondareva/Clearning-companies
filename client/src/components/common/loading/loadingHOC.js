import React, {Component} from 'react';
import './loadingHOC.css';

// const isEmpty = (prop) => (
//     prop === null ||
//     prop === undefined ||
//     (prop.hasOwnProperty('length') && prop.length === 0) ||
//     (prop.constructor === Object && Object.keys(prop).length === 0)
//   );
  

const loadingHOC = (loadingProp) => (WrappedComponent)=>{
    return class LoadingHOC extends Component{
        render(){
            return this.props[loadingProp]===true
                ?<div className="loader"/>
                : <WrappedComponent  {...this.props}/>
        }
    }
}

export default loadingHOC;
