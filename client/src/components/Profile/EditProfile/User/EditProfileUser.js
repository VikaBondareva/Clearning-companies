import React from "react";
import PropTypes from "prop-types";
import { Input, Switch, FormControlLabel, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "../styleEdit";
import classNames from "classnames";

function EditProfileUser(props) {
  const {
    classes,
    errors,
    values,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit
  } = props;

  const renderAddress = (address, i) => {
    return (
      <div className={classes.input} key={i}>
        <Input
          className={classes.inputTextAddress}
          onChange={handleChange}
          multiline
          name={`addresses[${i}]`}
          value={values.addresses[i]}
          error={
            touched.addresses &&
            touched.addresses[i] &&
            Boolean(errors.addresses) &&
            Boolean(errors.addresses[i])
          }
        />
        <Button
          size="small"
          onClick={async () => {
            await setFieldValue("removeIndex", i);
            await setFieldValue("actionName", "removeAddress");
            handleSubmit();
          }}
          className={classes.deleteItem}
        >
          X
        </Button>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.grid}>
        <p>Имя</p>
        <Input
          className={classes.input}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          error={touched.name && Boolean(errors.name)}
        />
      </div>
      <div className={classes.grid}>
        <p>Фамилия</p>
        <Input
          name="surname"
          className={classes.input}
          value={values.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.surname && Boolean(errors.surname)}
        />
      </div>
      <div className={classes.grid}>
        <p>Email</p>

        <div>
          <Input
            name="email"
            className={classes.input}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
          />
          {values.notVerifiedEmail && (
            <p className={classes.textError}>
              Потдтвердите: {values.notVerifiedEmail}
            </p>
          )}
        </div>
      </div>
      <div className={classes.grid}>
        <p>Мобильный телефон</p>
        <Input
          name="phone"
          className={classes.input}
          value={values.phone}
          onChange={handleChange}
          error={touched.phone && Boolean(errors.phone)}
        />
      </div>
      {/* <div className={classes.grid}>
        <p>Адреса</p>
        <div className={classes.flexColumn}>
          {values.addresses.map(renderAddress)}

          <Button
            variant="contained"
            className={classNames(classes.submit, classes.input)}
            onClick={async () => {
              await setFieldValue("actionName", "addAddress");
              handleSubmit();
            }}
          >
            Добавить адрес
          </Button>
        </div>
      </div> */}
      <div className={classes.flex}>
        <p>Вы хотите получать оповещания на Email?</p>
        <FormControlLabel
          control={
            <Switch
              name="isNotify"
              checked={values.isNotify}
              onChange={handleChange}
              color="primary"
            />
          }
          label={values.isNotify ? "Да" : "Нет"}
        />
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={async () => {
          await setFieldValue("actionName", "save");
          handleSubmit();
        }}
        className={classes.submitMain}
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
