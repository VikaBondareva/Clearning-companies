import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import { ButtonLink } from "../../../common/buttons";
import { styles } from "../styleEdit";

function EditProfileUser(props) {
  const {
    classes,
    errors,
    values,
    touched,
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
    <form onSubmit={handleSubmit} className={classes.form}>
      {values.error && <p>{values.error}</p>}
      <div className={classes.gridBig}>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="name">Ваше название компании</InputLabel>
          <Input
            name="name"
            fullWidth
            className={classes.input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={touched.name && Boolean(errors.name)}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="address.country">Email</InputLabel>
          <Input
            name="email"
            fullWidth
            className={classes.input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
          />
        </FormControl>
      </div>

      <div>
        <p>Описание</p>
        <textarea
          className={classes.textArea}
          rows="6"
          value={values.description}
          name="description"
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
          onChange={handleChange}
          id="review"
        />
        {/* <Input
          name="description"
          multiline
          rowsMax="10"
          className={classes.inputBig}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
        /> */}
      </div>

      {/* <div className={classes.grid}>
        <p>Мобильный телефон</p>
        <Input
          name="phone"
          className={classes.input}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
        />
      </div> */}

      <p>Адрес</p>
      <div className={classes.gridBig}>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="address.country">Страна</InputLabel>
          <Input
            className={classes.inputSmall}
            name="address.country"
            onChange={handleChange}
            value={values.address.country}
            onBlur={handleBlur}
            error={isError("country")}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="address.city">Город</InputLabel>
          <Input
            className={classes.inputSmall}
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
          <InputLabel htmlFor="address.other">Улица</InputLabel>
          <Input
            className={classes.inputSmall}
            name="address.other"
            onChange={handleChange}
            value={values.address.other}
            onBlur={handleBlur}
            error={isError("other")}
          />
        </FormControl>
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        // className={classes.submit}
      >
        Сохранить
      </Button>
    </form>
  );
}

EditProfileUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfileUser);
