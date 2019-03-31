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
import SocialAuth from '../SocialAuth/SosialAuthComponent';
import {valid, validPassword, formValid} from '../../../helpers/validation';
import loadingHOC from '../../common/loading/loadingHOC';

import styles from '../style';

class Login extends Component {
    constructor(props) {
      super(props);
      // const redirectRoute = this.props.location.query.next || '/login';
      this.state = {
        user: {
          identifier: '',
          password: "",
        },
        redirectTo: '/profile',
        formErrors: {
          identifier: true,
          password: true, 
        },
        error: ""
      };
    }
  
    validate = () => {
      const {formErrors, user} = this.state;
  
      formErrors.identifier = valid(user.identifier);
      formErrors.password = validPassword(user.password);
  
      this.setState({ formErrors, user, error: "" });
    };
  
    handleChange = event => {
      const {name, value} = event.target;

      this.setState({
        user: {
              ...this.state.user,
              [name]: value
        }
      })
    };

    handleMessage = msg =>{
      this.setState({ error:msg });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      this.validate()
      let valid = formValid(this.state.formErrors);
      if (valid) {
        this.props.login(this.state.user, this.state.redirectTo);
      } else 
          this.handleMessage("Invalid data entered")
    };

    render() {
        const { classes } = this.props;

        const {identifier,  password} = this.state.formErrors;
        return (
            <main className={`${classes.main}`}>
              <div className={classes.mainSmall}>
              <CssBaseline />
              <Paper className={classes.paper}>
                  <Link to='/'>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar> 
                  </Link>
                  <Typography component="h1" variant="h5">
                  Sign in to Mega Clean
                  </Typography>
                  {this.state.error
                    ? <p className={classes.error}>{this.state.error}</p>
                    : this.props.message 
                      ?  <p className={classes.error}>{this.props.message }</p>
                      : ''
                  }
                  <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel 
                        htmlFor="identifier"
                        >Email Address or Phone Number</InputLabel>
                      <Input 
                        name="identifier"
                        autoComplete="identifier"
                        onChange={this.handleChange}
                        error={!identifier}
                      />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input 
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        autoComplete="current-password"
                        error={!password}
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
              </div>
            </main>
        );
    }   
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  message: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};


export default loadingHOC('isLoading')(withStyles(styles)(Login));