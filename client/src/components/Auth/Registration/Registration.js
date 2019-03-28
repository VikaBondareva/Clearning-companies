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

import ApiService from '../../../services/auth.service';
import SocialAuth from '../../SocialAuth/SosialAuthComponent';

import styles from '../style';
import PhoneMask from "../../Masks/PhoneMask";
import {Link} from 'react-router-dom';


class Registration extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: {
            name: "",
            surname: "",
            email: "",
            phone: "",
            password: "",
            addresses: [],
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
        errorRegister: ""
      };
    }
  
    validate = afterSetState => {
        let nameError = true;
        let surnameError = true;
        let passwordError = true;
        let addressesError = true;
        let confirmPasswordError = true;
        let emailError = true;
        let phoneNumberError = true;
    
        const {name, surname, email, phone, password, confirmPassword, addresses} = this.state.user;
       
        if (name.indexOf(" ") !== -1 || name.length < 4) {
          nameError = false;
        }

        if (surname.indexOf(" ") !== -1 || surname.length < 4) {
            surnameError = false;
        }
         
        if (password.length < 7) {
          passwordError = false;
        }
         if (password !== confirmPassword) {
          confirmPasswordError = false;
        }
        
         if ( (email.length < 6) ||(email.indexOf("@") === -1)){
              emailError = false;
        }
    
        if (phone.length > 0 &phone.length < 13 ) {
          phoneNumberError = false;
        }
        
        const errors = {
            name:nameError,
            surname: surnameError,
            email: emailError,
            phone: phoneNumberError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
            addresses: false
        }
        this.setState({ errors, errorRegister: "" }, afterSetState);
    }
  
    handleMessage = (msg) => {
      this.setState({errorRegister: msg});
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      this.validate(() => {
          let valid = Object.keys(this.state.errors).every(val=> val === true);
        if (valid) {
          let {confirmPassword, ...user} = this.state.user;
          ApiService.registration(user)
            .then(response=>{
                console.log(response);
            })
            .catch((error) => {
              console.error(error)
              this.handleMessage("Аккаунт с такими данными уже существует")
            });
        } else {
          this.handleMessage("Введите корректные данные")
        }
    })
    };

    render() {
        const { classes } = this.props;
        const {errorRegister, textmask} = this.state;
        const {email,  password,name, surname,phone, addresses, confirmPassword} = this.state.errors;
        return (
            <main className={`${classes.main} ${classes.mainBig}`}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                Sign up to Mega Clean
                </Typography>
                <p className={classes.error}>{errorRegister && `${errorRegister}`}</p>
                <form className={classes.form}>
                <div className={classes.grid}>
                    <FormControl margin="normal" required >
                        <InputLabel 
                        htmlFor="name"
                        >Name</InputLabel>
                        <Input 
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleChange}
                        error={Boolean(!name)}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel 
                        htmlFor="surname"
                        >Surname</InputLabel>
                        <Input 
                        id="surname"
                        name="surname"
                        autoComplete="surname"
                        autoFocus
                        onChange={this.handleChange}
                        error={Boolean(!surname)}
                        />
                    </FormControl>
                </div>
                <div className={classes.grid}>
                    <FormControl margin="normal" >
                        <InputLabel 
                        htmlFor="email"
                        >Email address</InputLabel>
                        <Input 
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleChange}
                        error={Boolean(!email)}
                        />
                    </FormControl>

                    <FormControl margin="normal" >
                         <InputLabel 
                        htmlFor="phone"
                        >Phone number</InputLabel>
                        <Input 
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            value={textmask}
                            onChange={this.handleChange}
                            error={Boolean(!phone)}
                            inputComponent={PhoneMask}
                        />
                    </FormControl>
                </div>
                <div className={classes.grid}>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                        error={Boolean(!password)}
                        />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                        <Input 
                        name="confirmPassword"
                        type="confirmPassword"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                        error={Boolean(!confirmPassword)}
                        />
                    </FormControl>
                </div>
                <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="confirmPassword">Address</InputLabel>
                        <Input 
                        name="addresses"
                        type="addresses"
                        id="addresses"
                        autoComplete="addresses"
                        onChange={this.handleChange}
                        error={Boolean(!addresses)}
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
                    Sign Up
                </Button>

                </form>
                <div style={{textAlign: "center"}}>
                    <p>Sign up through social networks</p>
                    <SocialAuth/>
                </div>
                <p>You have account? <Link to='/login'>Sign In</Link></p>
            </Paper>
            </main>
        );
    }   
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);