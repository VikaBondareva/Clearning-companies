import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  ServiceForm,
  RoomsForm,
  WorkPlan
} from "../../../common/company-forms";
import Input from "@material-ui/core/Input";
import { styles } from "../styleEdit";

function EditProfileCompany(props) {
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
          error={Boolean(errors.description)}
          onChange={handleChange}
          id="review"
        />
      </div>
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
      <div className="card-from card-from_blue-white">
        <WorkPlan
          setFieldValue={setFieldValue}
          errors={errors.workPlan}
          workPlan={values.workPlan}
          touched={touched.workPlan}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </div>
      <div className="card-from card-from_blue-white">
        <ServiceForm
          setFieldValue={setFieldValue}
          errors={errors.services}
          services={values.services}
          touched={touched.services}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </div>
      <div className="card-from card-from_blue-white">
        <RoomsForm
          setFieldValue={setFieldValue}
          errors={errors.rooms}
          values={values.rooms}
          touched={touched.rooms}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
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
      >
        Сохранить
      </Button>
    </form>
  );
}

EditProfileCompany.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfileCompany);
