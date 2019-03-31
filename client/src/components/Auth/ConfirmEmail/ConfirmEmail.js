import React, { Component } from 'react';
import ApiService from '../../../services/auth.service';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class ConfirmEmailComponent extends Component {
  
  state = {
    confirming: false
  }

  componentDidMount = () => {
    const { token, email } = this.props.match.params
    ApiService.confirmEmail(token, email)
      .then(data => {
        this.setState({ confirming: true })
        setTimeout(this.props.history.push('/'), 5000);
      })
      .catch(err => console.log(err))
  }

  render = () =>
    <div>
        <p>Ваша почта подтверджена</p>
        <Link to='/profile' className="confirm-link">
            Перейти в профиль
        </Link>
    </div>
}

export default ConfirmEmailComponent;