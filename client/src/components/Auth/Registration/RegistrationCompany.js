import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import SocialAuth from '../SocialAuth/SosialAuthComponent';

import styles from '../style';
import Modal from '../../common/modal/ModalComponent';
import {Link} from 'react-router-dom';
import {formValid,valid, validEmail, validConfirmPassword, validPassword} from '../../../helpers/validation';
import loadingHOC from '../../common/loading/loadingHOC';


class Registration extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        company: {
          name: "",
          description: '',
          email: '',
          password: "",
          addresses: [""],
          confirmPassword: ""
        },
        errors : {
          name: true,
          description: true,
          email: true,
          password: true,
          address: true,
          confirmPassword: true,
        },
        errorRegister: "",
        isSuccess: this.props.isSendEmail
      };
    }
  
    validate = () => {
      let {errors, errorRegister,company } = this.state;
      errorRegister = "";

        errors.name = valid(company.name);
        errors.description = valid(company.description);
        errors.email = validEmail(company.email);
        errors.address = valid(company.address);
        errors.password = validPassword(company.password);
        errors.confirmPassword = validConfirmPassword(company.confirmPassword,company.password);
      

      this.setState({ errors, errorRegister });
    }
  
    handleChange = event =>{
      const {name, value} = event.target;

        this.setState({
          company: {
                ...this.state.company,
                [name]: value
          }
        })
    }

    handleMessage = (msg) => {
      this.setState({errorRegister: msg});
    };

    handleModal = ()=>{
      this.setState({isSuccess: !this.state.isSuccess})
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.validate();
      console.log(this.state.errors);
      console.log(this.state.company);
      let valid = formValid(this.state.errors);
      if (valid) {
        const {confirmPassword, ...company} = this.state.company;
        this.props.registerCompany(company);
      } else {
        if(!this.state.errorRegister)
            this.handleMessage("Invalid data entered")
      }
    };

    handleModal = ()=>{
      this.setState({isSuccess: !this.state.isSuccess})
    }

    render() {
        const { classes, message } = this.props;
        const {errorRegister, isSuccess} = this.state;
        const {email,  password,name,address, confirmPassword,description} = this.state.errors;
        return (
          <main className={`${classes.main}`}>
            <div className={classes.mainBig}>
              <CssBaseline />
              <Paper className={classes.paper}>
                  <Link to='/'>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar> 
                  </Link>
                  <Typography component="h1" variant="h5">
                    Sign up to Mega Clean
                  </Typography>
                  {errorRegister
                    ? <p className={classes.error}>{errorRegister}</p>
                    : message 
                      ?  <p className={classes.error}>{message }</p>
                      : ''
                  }
                  <form className={classes.form}>
                  <div className={classes.grid}>
                      <FormControl margin="normal" required>
                          <InputLabel 
                          htmlFor="name"
                          >Name</InputLabel>
                          <Input 
                          name="name"
                          onChange={this.handleChange}
                          autoComplete="name"
                          error={!name}
                      />
                      </FormControl>
                      <FormControl margin="normal" >
                              <InputLabel 
                              htmlFor="email"
                              >Email address</InputLabel>
                              <Input 
                              name="email"
                              autoComplete="email"
                              onChange={this.handleChange}
                              error={!email}
                              />
                      </FormControl>

                  </div>
                  <FormControl margin="normal" required fullWidth className={classes.formControl}>
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <Input 
                          name="description"
                          type="text"
                          autoComplete="description"
                          onChange={this.handleChange}
                          error={!description}
                          />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="address">Address</InputLabel>
                          <Input 
                          name="address"
                          autoComplete="address"
                          onChange={this.handleChange}
                          error={!address}
                          />
                  </FormControl>
                  <div className={classes.grid}>
                      <FormControl margin="normal" required >
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input 
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            error={!password}
                          />
                      </FormControl>
                      <FormControl margin="normal" required >
                          <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                          <Input 
                          name="confirmPassword"
                          type="password"
                          autoComplete="current-password"
                          onChange={this.handleChange}
                          error={!confirmPassword}
                          />
                      </FormControl>
                  </div>
                  
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.handleSubmit}
                      className={classes.submit}
                  >
                      Sign Up
                  </Button>

                  </form>
                  <div style={{textAlign: "center"}}>
                      <p>Sign up through social networks</p>
                      <SocialAuth/>
                  </div>
                  <p>You have account? <Link to='/login'>Sign In</Link></p>
                  <p><Link to='/register'>Register as client</Link></p>
              </Paper>
              {this.props.isSendEmail && <Modal onClose={this.handleModal} description="На вашу почту отпарвлено сообщение с подтверждением регистрации"/>}
              </div>
            </main>
        );
    }   
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  registerCompany: PropTypes.func.isRequired
};

export default loadingHOC('isLoading')(withStyles(styles)(Registration));
