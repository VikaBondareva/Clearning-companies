import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { ButtonLink } from "../../../common/buttons";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "../styleEdit";

function ChangePasswordForm(props) {
  const {
    classes,
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    handleSubmit
  } = props;
  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl margin="normal" required className={classes.inputBig}>
          <InputLabel htmlFor="oldPassword">Старый пароль</InputLabel>
          <Input
            name="oldPassword"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.oldPassword && Boolean(errors.oldPassword)}
          />
        </FormControl>
        <FormControl margin="normal" required className={classes.inputBig}>
          <InputLabel htmlFor="newPassword">Новый пароль</InputLabel>
          <Input
            name="newPassword"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.newPassword && Boolean(errors.newPassword)}
          />
        </FormControl>
        <FormControl margin="normal" required className={classes.inputBig}>
          <InputLabel htmlFor="confirmPassword">Подтвердите пароль</InputLabel>
          <Input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          />
        </FormControl>
        <div className={classes.flex}>
          <ButtonLink name="Назад" to="/profile/edit" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Сменить пароль
          </Button>
        </div>
      </form>
    </>
  );
}

ChangePasswordForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangePasswordForm);
