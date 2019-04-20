import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {EMAIL_CONFIRM_ERROR} from '../../../actions/actionTypes';
import {parse} from "query-string";
import {Loader} from '../../common/loading';

class ConfirmEmailComponent extends Component {
  
  componentWillMount() {
    const {token, email} = parse(this.props.location.search);
    this.props.confirmEmail(token, email);
  }

  render(){
    if(this.props.isLoading){
      return <Loader />
    }
    return (
      <div>
        {(this.props.error && this.props.error.id ===  EMAIL_CONFIRM_ERROR)
          ?  <>
              <p>Something is wrong! Error: {this.props.error.message}</p>
              <Link to="/login">
                Go to the auth page
              </Link>
            </>
          : <>
              <p> Email confirmed successfully!</p>
              <Link to='/profile' className="confirm-link">
                  Go to the profile
              </Link>
            </>
        }
    </div>
    )
  }
}

ConfirmEmailComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  confirmEmail: PropTypes.func.isRequired
};

export default ConfirmEmailComponent;