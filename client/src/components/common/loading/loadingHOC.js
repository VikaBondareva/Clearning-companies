import React, {Component} from 'react';
import {Loader} from './Loading';

const loadingHOC = (loadingProp) => (WrappedComponent)=>{
    return class LoadingHOC extends Component{
        render(){
            return this.props[loadingProp]===true
                ?<Loader />
                : <WrappedComponent  {...this.props}/>
        }
    }
}

export default loadingHOC;
