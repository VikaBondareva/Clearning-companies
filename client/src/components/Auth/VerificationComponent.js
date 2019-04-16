import React, { Component } from "react";
import { InputLabel, Input, Button, FormControl } from "@material-ui/core";
import {Button as ButtonLink} from '../common/buttons';
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";
import styles from './style';

class VerificationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationCode: "",
      email: props.email
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      verificationCode: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    const { email, verificationCode } = this.state;
    this.props.sendVerificationCode({ email, verificationCode: +verificationCode });
  }

  handleClick(event){
      event.preventDefault()
      this.props.sendNewVerificationCode(this.state.email);
  }

  render() {
    const {classes} = this.props;
    return (
        <form onSubmit={this.handleSubmit} className={classes.formCode}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="verificationCode">
              Enter your verification code 
            </InputLabel>
            <Input
              value={this.state.verificationCode}
              onChange={this.handleChange}
              id="verificationCode"
            />
          </FormControl>
          <div>
          <Button  className={classes.btnMargin} variant="outlined"  onClick={this.handleClick} color="primary" >Send code yet</Button>
          <Button  className={classes.btnMargin} type="submit" color="primary">Send</Button>
          </div>
         
        </form>
    );
  }
}

export const  VerificationCodeForm = withStyles(styles)(VerificationForm);
