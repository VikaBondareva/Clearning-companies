import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {Link} from 'react-router-dom';
import ApiService from '../../../services/auth.service';
import SocialAuth from '../../SocialAuth/SosialAuthComponent';

import styles from '../style';


const formValid = ({formErrors, ...rest}) => {
  let valid = false;

  Object.value(formErrors).forEach(val=> val.length > 0 && (valid=false));
  
  Object.value(rest).forEach(val=>{
    val === null && (valid = false);
  })

  return valid;
}

class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        emailError: true,
        passwordError: true, 
        error: ""
      };
    }
  
    validate = (afterSetState) => {
      let emailError = true;
      let passwordError = true;
      const {email, password} = this.state;
  
      if (email.indexOf(" ") !== -1) {
          emailError = false;
      } else if (email.length < 7) {
          emailError = false
      }
  
      if (password.length < 7) {
        passwordError =false;
      }
  
      this.setState({ emailError, passwordError, error: "" }, afterSetState);
    };
  
    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };

    handleMessage = msg =>{
      this.setState({ error:msg });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      this.validate(() => {
        if (this.state.emailError & this.state.passwordError) {
          const user = {email: this.state.email, password: this.state.password};
          ApiService.login(user)
            .then((res) => {
              //   this.props.authUser();
              console.log(res)
            })
            .catch((error) => {
              console.log(error)
              this.handleMessage("Неверный логин или пароль")
            });
        }
          this.handleMessage("Введите корректные данные")
      })
    };

    render() {
        const { classes } = this.props;
        const {emailError,  passwordError,error} = this.state
        return (
            <main className={`${classes.main} ${classes.mainSmall}`}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in to Mega Clean
                </Typography>
                <p className={classes.error}>{error && <p>{error}</p>}</p>
                <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel 
                      htmlFor="email"
                      >Email Address or Phone Number</InputLabel>
                    <Input 
                      id="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={this.handleChange("email")}
                      error={Boolean(!emailError)}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                      name="password"
                      type="password"
                      id="password"
                      onChange={this.handleChange("password")}
                      autoComplete="current-password"
                      error={Boolean(!passwordError)}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                    className={classes.submit}
                >
                    Sign In
                </Button>
                </form>
                <div style={{textAlign: "center"}}>
                    <p>Sign in through social networks</p>
                    <SocialAuth/>
                </div>
                <p>You have not account? <Link to='/register'>Create an account.</Link></p>
            </Paper>
            </main>
        );
    }   
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);