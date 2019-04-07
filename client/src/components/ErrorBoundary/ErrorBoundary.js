import React, {Component} from 'react';
import ServerError from '../NotFound/ServerError';
export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        error: '',
      };
    }
    
    componentDidCatch(error) {
      this.setState({
        error: error.message,
      });
    }
    
    render() {
      if (this.state.error) {
        return (
          <ServerError error={this.state.error}/>
        );
      }
      
      return this.props.children;
    }
  }