import React, {Component} from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        error: false,
        info: null
      };
    }
    
    componentDidCatch(error, info) {
      console.log(error, info);
      
      this.setState({
        error: true,
        info: info
      });
    }
    
    render() {
      if (this.state.error) {
        return (
          <div>
            <h2>There was an error</h2>
            <pre>
              {this.state.info.componentStack}
            </pre>
          </div>
        );
      }
      
      return this.props.children;
    }
  }