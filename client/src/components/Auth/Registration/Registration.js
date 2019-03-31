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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SocialAuth from '../SocialAuth/SosialAuthComponent';

import styles from '../style';
import PhoneMask from "../../common/Masks/PhoneMask";
import Modal from '../../common/modal/ModalComponent';
import {Link} from 'react-router-dom';
import {formValid,valid, validEmail, validConfirmPassword, validPassword, validPhone} from '../../../helpers/validation';
import loadingHOC from '../../common/loading/loadingHOC';

class Registration extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: {
          name: "",
          surname: "",
          email: null,
          phone: null,
          password: "",
          addresses: [""],
          confirmPassword: ""
        },
        errors : {
          name: true,
          surname: true,
          email: true,
          phone: true,
          password: true,
          addresses: true,
          confirmPassword: true,
        },
        errorRegister: "",
        isSuccess: this.props.isSendEmail
      };

      this.formRef = React.createRef();
    }
  
    validate = () => {
      let {errors, errorRegister,user } = this.state;
      errorRegister = "";

        errors.name = valid(user.name);
        errors.surname = valid(user.surname);
        errors.email = validEmail(user.email);
        errors.phone = validPhone(user.phone);
        errors.addresses = valid(user.addresses[0]);
        errors.password = validPassword(user.password);
        errors.confirmPassword = validConfirmPassword(user.confirmPassword,user.password);
      
      if(!user.email && !user.phone){
        errorRegister = "Enter email or phone";
        errors.email = false;
      }

      this.setState({ errors, errorRegister });
    }
  
    handleChange = event =>{
      const {name, value} = event.target;

      if (name === "addresses"){
        let addresses = [value];
        this.setState({
          user: {
                ...this.state.user,
                addresses
          }
        })
      } else {
        this.setState({
          user: {
                ...this.state.user,
                [name]: value
          }
        })
      }
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
      let valid = formValid(this.state.errors);
      if (valid) {
        const {confirmPassword, ...user} = this.state.user;
        this.props.registerUser(user);
      } else {
        if(!this.state.errorRegister)
            this.handleMessage("Invalid data entered")
      }
    }

    render() {
        const { classes,message } = this.props;
        const {errorRegister, textmask, isSuccess} = this.state;
        const {email,  password,name, surname,phone, addresses, confirmPassword} = this.state.errors;
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
                <form className={classes.form} ref={this.formRef}>
                <div className={classes.grid}>
                    <FormControl margin="normal" required >
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
                    <FormControl margin="normal" required >
                        <InputLabel 
                        htmlFor="surname"
                        >Surname</InputLabel>
                        <Input 
                        name="surname"
                        autoComplete="surname"
                        onChange={this.handleChange}
                        error={!surname}
                        />
                    </FormControl>
                </div>
                <div className={classes.grid}>
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

                    <FormControl margin="normal" >
                         <InputLabel 
                        htmlFor="phone"
                        >Phone number</InputLabel>
                        <Input 
                            name="phone"
                            autoComplete="phone"
                            value={textmask}
                            onChange={this.handleChange}
                            error={!phone}
                            inputComponent={PhoneMask}
                        />
                    </FormControl>
                </div>
                <FormControl margin="normal" required fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="addresses">Address</InputLabel>
                        <Input 
                        name="addresses"
                        type="addresses"
                        autoComplete="addresses"
                        onChange={this.handleChange}
                        error={!addresses}
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
                <p><Link to='/register-company'>Register as company</Link></p>
            </Paper>
            {isSuccess && <Modal onClose={this.handleModal} description="На вашу почту отпарвлено сообщение с подтверждением регистрации"/>}
            </div>
            </main>
        );
    }   
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  registerUser: PropTypes.func.isRequired
};

export default loadingHOC('isLoading')(withStyles(styles)(Registration));
