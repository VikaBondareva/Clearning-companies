import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from '../../../style';

function Registration(props) {
    const { classes, values, errors, touched, handleChange,handleBlur,handleSubmit } = props;

    function isError(value){
      const address = touched.address;
      const addressError = errors.address;
      return address && address[value] && Boolean(addressError) && Boolean(addressError[value]);
    }

        return (
                  <form className={classes.form} onSubmit={handleSubmit}>
                  <div className={classes.grid}>
                      <FormControl margin="normal" required>
                          <InputLabel 
                            htmlFor="name"
                          >Name</InputLabel>
                          <Input 
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                          />
                      </FormControl>
                      <FormControl margin="normal" >
                              <InputLabel 
                              htmlFor="email"
                              >Email address</InputLabel>
                              <Input 
                              name="email"
                              onChange={handleChange}
                              value={values.email}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              />
                      </FormControl>
                  </div>
                  <FormControl margin="normal" required fullWidth className={classes.formControl}>
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <Input 
                          name="description"
                          onChange={handleChange}
                          value={values.description}
                          onBlur={handleBlur}
                          error={touched.description && Boolean(errors.description)}
                          />
                  </FormControl>
                  <div className={classes.grid}>
                  <FormControl margin="normal" required fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="address.city">City</InputLabel>
                          <Input 
                          name="address.city"
                          onChange={handleChange}
                          value={values.address.city}
                          onBlur={handleBlur}
                          error={isError("city")}
                          />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="address.country">Country</InputLabel>
                          <Input 
                          name="address.country"
                          onChange={handleChange}
                          value={values.address.country}
                          onBlur={handleBlur}
                          error={isError("country")}
                          />
                  </FormControl>
                  </div>
                  <FormControl margin="normal" required fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="address.other">Other</InputLabel>
                          <Input 
                          name="address.other"
                          onChange={handleChange}
                          value={values.address.other}
                          onBlur={handleBlur}
                          error={isError('other')}
                          />
                  </FormControl>
                  <div className={classes.grid}>
                      <FormControl margin="normal" required >
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input 
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                          />
                      </FormControl>
                      <FormControl margin="normal" required >
                          <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                          <Input 
                          name="confirmPassword"
                          type="password"
                          onChange={handleChange}
                          value={values.confirmPassword}
                          onBlur={handleBlur}
                          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                          />
                      </FormControl>
                  </div>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                      Next
                  </Button>
                  </form>
        );
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);
