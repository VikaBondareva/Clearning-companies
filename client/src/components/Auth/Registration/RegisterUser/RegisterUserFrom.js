import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../../style";
import PhoneMask from "../../../common/Masks/PhoneMask";

function Registration(props) {
  const {
    classes,
    errors,
    values,
    isSendCode,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.grid}>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="name">Имя</InputLabel>
            <Input
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
            />
          </FormControl>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="surname">Фамилия</InputLabel>
            <Input
              name="surname"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.surname && Boolean(errors.surname)}
            />
          </FormControl>
        </div>
        <div className={classes.grid}>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="phone">Мобильный телефон</InputLabel>
            <Input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && Boolean(errors.phone)}
              // inputComponent={PhoneMask}
            />
          </FormControl>
        </div>
        {/* <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="address">Адрес</InputLabel>
          <Input
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
          />
        </FormControl> */}
        <div className={classes.grid}>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
            />
          </FormControl>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="confirmPassword">
              Подтвердите пароль
            </InputLabel>
            <Input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            />
          </FormControl>
        </div>
        <Button
          type="submit"
          fullWidth
          disabled={isSendCode}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Зарегестрироваться
        </Button>
      </form>
    </>
  );
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Registration);
