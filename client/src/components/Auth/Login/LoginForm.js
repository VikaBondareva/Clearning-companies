import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import {FormControl,FormControlLabel,Checkbox} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../style";

function LoginForm(props) {
  const {
    classes,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="identifier">Email</InputLabel>
          <Input
            name="identifier"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControl>
        {errors.identifier && touched.identifier && (
          <div className={classes.error}>{errors.identifier}</div>
        )}
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControl>
        {errors.password && touched.password && (
          <div className={classes.error}>{errors.password}</div>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={values.isExecutor}
              onChange={handleChange}
              value={values.isExecutor}
              name="isExecutor"
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          }
          label="Войти как компания ?"
        />
        <Button
          type="submit"
          fullWidth
          disabled={props.isSendCode}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Войти
        </Button>
      </form>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
