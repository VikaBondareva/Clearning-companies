import React, {Component} from 'react';
import {Loader} from './Loading';

const loadingHOC = (loadingProp, isSmall) => (WrappedComponent)=>{
    return class LoadingHOC extends Component{
        render(){
            return this.props[loadingProp]===true
                ?<Loader isSmall={isSmall}/>
                : <WrappedComponent  {...this.props}/>
        }
    }
}

export default loadingHOC;
