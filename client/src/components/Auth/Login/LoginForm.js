import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from '../style';

function LoginForm(props) {
   
        const { classes, values, errors, touched, handleChange,handleBlur,handleSubmit } = props;
        return (
                  <form className={classes.form} onSubmit={handleSubmit}>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel 
                        htmlFor="identifier"
                        >Email Address or Phone Number</InputLabel>
                      <Input 
                        name="identifier"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={Boolean(errors.identifier)}
                      />
                  </FormControl>
                  {errors.identifier && touched.identifier && <div className={classes.error}>{errors.identifier}</div>}
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input 
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={Boolean(errors.password)}
                      />
                  </FormControl>
                  {errors.password && touched.password && <div className={classes.error}>{errors.password}</div>}
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                      Sign In
                  </Button>
                  </form>
        );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);