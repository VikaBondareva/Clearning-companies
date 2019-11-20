import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from './styles';

function RoomsFormComponent(props) {
  const {
    classes,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = props;

  function isError(roomName, value) {
    // const room = touched[roomName];
    // const roomError = errors[roomName];
    return (
      touched &&touched[roomName] && touched[roomName][value] && errors && Boolean(errors[roomName]) && Boolean(errors[roomName][value])
    );
  }
  return (
    <>
      <p className="title_bold title_big">Расценки комнат</p>
      <p className="title_bold">Санузел</p>
      <div className={classes.gridAround}>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="toilet.price">Цена</InputLabel>
          <Input
            name="toilet.price"
            type="number"
            onChange={handleChange}
            value={values.toilet.price}
            onBlur={handleBlur}
            error={isError("toilet", "price")}
          />
        </FormControl>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="toilet.time">Время уборки</InputLabel>
          <Input
            name="toilet.time"
            type="number"
            onChange={handleChange}
            value={values.toilet.time}
            onBlur={handleBlur}
            error={isError("toilet", "time")}
          />
        </FormControl>
      </div>
      <p className="title_bold">Маленькая комната</p>
      <div className={classes.gridAround}>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="standart.price">Цена</InputLabel>
          <Input
            name="standart.price"
            type="number"
            onChange={handleChange}
            value={values.standart.price}
            onBlur={handleBlur}
            error={isError("standart", "price")}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          fullWidth
          className={classes.formControl}
        >
          <InputLabel htmlFor="standart.time">Время уборки</InputLabel>
          <Input
            name="standart.time"
            type="number"
            onChange={handleChange}
            value={values.standart.time}
            onBlur={handleBlur}
            error={isError("standart", "time")}
          />
        </FormControl>
      </div>
      <p className="title_bold">Большая комната</p>
      <div className={classes.gridAround}>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="big.price">Цена</InputLabel>
          <Input
            name="big.price"
            type="number"
            onChange={handleChange}
            value={values.big.price}
            onBlur={handleBlur}
            error={isError("big", "price")}
          />
        </FormControl>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="big.time">Время</InputLabel>
          <Input
            name="big.time"
            type="number"
            onChange={handleChange}
            value={values.big.time}
            onBlur={handleBlur}
            error={isError("big", "time")}
          />
        </FormControl>
      </div>
    </>
  );
}

export const RoomsForm = withStyles(styles)(RoomsFormComponent);
