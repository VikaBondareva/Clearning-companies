import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../style/styleForm";
import ButtonsBooking from './ButtonsBooking';
import {SelectChip} from '../common/select';
import "./style.css";

function BookingForm(props) {
  const {
    errors,
    values,
    classes,
    setFieldValue,
    touched,
    isAuth,
    minDate,
    previously,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  function renderSelectMenu(values, nameValue) {
    return values.map(value => (
      <MenuItem key={value[nameValue]} value={value}>
        {value.name}
      </MenuItem>
    ));
  }

  function isError(value) {
    return (
      touched.countRooms &&
      touched.countRooms[value] &&
      Boolean(errors.countRooms) &&
      Boolean(errors.countRooms[value])
    );
  }

  async function handleClick (actionName) {
      await setFieldValue("action", actionName);
      handleSubmit();
  }

  const renderButtons = () => {
     return <ButtonsBooking isCompany={previously} isAuth={isAuth} onClick={handleClick}/>
  };

  const renderRecurrentSelect = recurrent => {
    if (recurrent) {
      return (
        <div>
          <p>
            Продолжительность сделки в месяцах (максимум пол года: 6 месяцев)
          </p>
          <FormControl margin="normal" required className={classes.inputLabel}>
            <Input
              type="number"
              name="duration"
              value={values.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{
                min: "1",
                max: "6"
              }}
              error={touched.duration && Boolean(errors.duration)}
            />
          </FormControl>
        </div>
      );
    }
    return null;
  };

  return (
    <form className={classes.formBooking} onSubmit={handleSubmit}>
      <p className="header-form">Форма бронирования уборки</p>
      <div className={classes.grid}>
        <FormControl required fullWidth>
          <InputLabel htmlFor="address">Адрес</InputLabel>
          <Input
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
          />
        </FormControl>
      </div>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="service">Выберите услуги</InputLabel>
        <Select
          value={values.service}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.regularity && Boolean(errors.regularity)}
          inputProps={{
            name: "service",
            id: "service"
          }}
        >
          {renderSelectMenu(values.servicesCompany, values.selectName)}
        </Select>
      </FormControl>
      <div>
        <p>Количество комнат</p>
        <FormControl margin="normal" required className={classes.inputLabel}>
          <InputLabel htmlFor="countRooms.toilet">Санулов</InputLabel>
          <Input
            type="number"
            name="countRooms.toilet"
            value={values.countRooms.toilet}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{
              min: 0,
              max: 20
            }}
            error={isError("toilet")}
          />
        </FormControl>
        <FormControl margin="normal" required className={classes.inputLabel}>
          <InputLabel htmlFor="countRooms.standart">Маленькиих</InputLabel>
          <Input
            type="number"
            name="countRooms.standart"
            value={values.countRooms.standart}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{
              min: 0,
              max: 15
            }}
            error={isError("standart")}
          />
        </FormControl>
        <FormControl margin="normal" required className={classes.inputLabel}>
          <InputLabel htmlFor="countRooms.big">Больших</InputLabel>
          <Input
            type="number"
            name="countRooms.big"
            value={values.countRooms.big}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{
              min: 0,
              max: 15
            }}
            error={isError("big")}
          />
        </FormControl>
      </div>
        <SelectChip 
          services={values.days}
          onChange={handleChange}
          servicesTypes={values.daysSelect}
          title={"День/ дни уборки"}
          name="days"
        />
      <div className={classes.grid}>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.inputLabel}
        >
          <TextField
            type="date"
            name="date"
            label="Дата уборки"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              min: minDate
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.date && Boolean(errors.date)}
            value={values.date}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.inputLabel}
        >
          <TextField
            id="startTime"
            label="Время начадо уборки"
            type="time"
            name="startTime"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.startTime}
            error={touched.startTime && Boolean(errors.startTime)}
          />
        </FormControl>
      </div>

      <div className={classes.grid}>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="regularity">
            Планируемая регулярность уборки
          </InputLabel>
          <Select
            value={values.regularity}
            onChange={async event => {
              if (event.target.value._id !== 1) {
                await setFieldValue("recurrent", true);
              } else {
                await setFieldValue("recurrent", false);
              }
              handleChange(event);
            }}
            onBlur={handleBlur}
            error={touched.regularity && Boolean(errors.regularity)}
            inputProps={{
              name: "regularity",
              id: "regularity"
            }}
          >
            {renderSelectMenu(values.regularityTypes, "_id")}
          </Select>
        </FormControl>
      </div>
      {renderRecurrentSelect(values.recurrent)}
      <div>
        {values.price > 0 && (
          <p>Предварительная цена уборки: {values.price} руб</p>
        )}
        {values.time > 0 && (
          <p>Предварительное время уборки: {values.time} минут</p>
        )}
      </div>
      <div>{renderButtons()}</div>
    </form>
  );
}

export default withStyles(styles)(BookingForm);
