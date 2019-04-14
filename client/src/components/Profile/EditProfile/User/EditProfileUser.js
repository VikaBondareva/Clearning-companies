import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
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
    setFieldValue,
    handleSubmit
  } = props;

  const renderAddress = (address, i) => {
    return (
      <div className={classes.inputText} key={i}>
        <Input
          className={classes.inputTextAddress}
          onChange={handleChange}
          multiline
          name={`addresses[${i}]`}
          value={values.addresses[i]}
          onBlur={handleBlur}
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
        <Input
          name="email"
          className={classes.input}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
        />
      </div>
      <div className={classes.grid}>
        <p>Мобильный телефон</p>
        <Input
          name="phone"
          className={classes.input}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
        />
      </div>
      <div className={classes.grid}>
        <p>Адреса</p>
        <div className={classes.flexColumn}>
          {values.addresses.map(renderAddress)}

          <Button
            variant="contained"
            className={classes.submit}
            onClick={async () => {
              await setFieldValue("actionName", "addAddress");
              handleSubmit();
            }}
          >
            Добавить адрес
          </Button>
        </div>
      </div>
      <div className={classes.flex}>
        <p>Оповещать?</p>
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
      <div className={classes.grid}>
        <p>Пароль</p>
        <ButtonLink name="Сменить" to="/profile/edit/password" />
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={async () => {
          await setFieldValue("actionName", "save");
          handleSubmit();
        }}
        className={classes.submit}
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
