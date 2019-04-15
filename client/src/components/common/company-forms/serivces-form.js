import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {serviceTypes} from '../../../utils';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from './styles';

function ServiceFormComponent(props) {
  const {
    classes,
    services,
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit
  } = props;

  function isError(index, value) {
    return (
      Boolean(errors) &&
      Boolean(errors[index]) &&
      Boolean(errors[index][value]) &&
      touched &&
      touched[index] &&
      touched[index][value]
    );
  }

  function renderSelectMenu(servicesTypes) {
    return servicesTypes.map(value => (
      <MenuItem key={value._id} value={value.name}>
        {value.name}
      </MenuItem>
    ));
  }

  function renderInput(service, i) {
    return (
      <div className={classes.gridForm} key={(i + 1) * 15}>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor={`services[${i}].name`}>
            Выберите тип услуги
          </InputLabel>
          <Select
            name={`services[${i}].name`}
            onChange={handleChange}
            value={service.name}
            onBlur={handleBlur}
            error={isError(i, "name")}
          >
            {renderSelectMenu(serviceTypes)}
          </Select>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor={`services[${i}].coefficient`}>
            Коэффициент
          </InputLabel>
          <Input
            name={`services[${i}].coefficient`}
            type="number"
            onChange={handleChange}
            value={service.coefficient}
            onBlur={handleBlur}
            error={isError(i, "coefficient")}
          />
        </FormControl>
        <Button
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          onClick={async () => {
            await setFieldValue("actionName", "removeService");
            await setFieldValue("removeIndexService", i);
            handleSubmit();
          }}
          className={classes.deleteItem}
        >
          X
        </Button>
      </div>
    );
  }

  return (
    <>
      <div >
        <p className="title_bold title_big">Расценки услуг</p>
      </div>
      {services.map(renderInput)}
      <div>
        <Button
          variant="outlined"
          onClick={async () => {
            await setFieldValue("actionName", "addService");
            handleSubmit();
          }}
        >
          Добавить еще услугу
        </Button>
      </div>
    </>
  );
}

export const ServiceForm = withStyles(styles)(ServiceFormComponent);