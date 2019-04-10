import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "../../../style";

function Registration(props) {
  const {
    classes,
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  function isError(value) {
    const address = touched.address;
    const addressError = errors.address;
    return (
      address &&
      address[value] &&
      Boolean(addressError) &&
      Boolean(addressError[value])
    );
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.grid}>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="name">Название компании</InputLabel>
          <Input
            name="name"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
          />
        </FormControl>
      </div>
      <FormControl
        margin="normal"
        required
        fullWidth
        className={classes.formControl}
      >
        <InputLabel htmlFor="description">Описание</InputLabel>
        <Input
          name="description"
          onChange={handleChange}
          value={values.description}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
        />
      </FormControl>
      <div className={classes.grid}>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="address.city">Город</InputLabel>
          <Input
            name="address.city"
            onChange={handleChange}
            value={values.address.city}
            onBlur={handleBlur}
            error={isError("city")}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="address.country">Страна</InputLabel>
          <Input
            name="address.country"
            onChange={handleChange}
            value={values.address.country}
            onBlur={handleBlur}
            error={isError("country")}
          />
        </FormControl>
      </div>
      <FormControl
        margin="normal"
        required
        fullWidth
        className={classes.formControl}
      >
        <InputLabel htmlFor="address.other">Улица</InputLabel>
        <Input
          name="address.other"
          onChange={handleChange}
          value={values.address.other}
          onBlur={handleBlur}
          error={isError("other")}
        />
      </FormControl>
      <div className={classes.grid}>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input
            name="password"
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => {
                    setFieldValue("showPassword", !values.showPassword);
                  }}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="confirmPassword">Подтердите пароль </InputLabel>
          <Input
            name="confirmPassword"
            type={values.showConfirmPassword ? "text" : "password"}
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => {
                    setFieldValue(
                      "showConfirmPassword",
                      !values.showConfirmPassword
                    );
                  }}
                >
                  {values.showConfirmPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
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
        Дальше
      </Button>
    </form>
  );
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Registration);
