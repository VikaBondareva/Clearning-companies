import React, { Component } from "react";
import { InputLabel, Input, Button, FormControl } from "@material-ui/core";
import {Button as ButtonLink} from '../buttons';
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";

export class VerificationCodeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationCode: "",
      email: props.email
    };
  }

  handleChange(event) {
    this.setState({
      verificationCode: event.target.value
    });
  }

  handleSubmit() {
    const { email, verificationCode } = this.state;
    this.props.sendVerificationCode({ email, verificationCode });
  }

  handleClick(){
      this.props.sendNewVerificationCode(this.state.email);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormControl required>
            <InputLabel htmlFor="verificationCode">
              Enter your verification code 
            </InputLabel>
            <Input
              value={this.state.verificationCode}
              onChange={this.handleChange}
              id="verificationCode"
            />
          </FormControl>
          <Button type="submit">Send</Button>
        </form>
        <ButtonLink name="Send code yet" onClick={this.handleClick} />
      </div>
    );
  }
}
