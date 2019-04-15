import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { daysSelect } from "../../../utils";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from './styles';

function WorkPlanComponent({
  workPlan,
  handleChange,
  handleBlur,
  touched,
  setFieldValue,
  errors,
  classes,
  handleSubmit
}) {
  const isErrorDays = (i, value) => {
    const workPlan = touched;
    const workPlanError = errors;
    return (
      workPlan &&
      workPlan[i] &&
      workPlan[i][value] &&
      Boolean(workPlanError) &&
      Boolean(workPlanError[i]) &&
      Boolean(workPlanError[i][value])
    );
  };

  function renderSelectMenu(values) {
    return values.map(value => (
      <MenuItem key={value.value} value={value.value}>
        {value.name}
      </MenuItem>
    ));
  }

  function renderInput(day, i) {
    return (
      <div className={classes.gridForm} key={(i + 1) * 15}>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor={`workPlan[${i}].day`}>День недели</InputLabel>
          <Select
            required
            name={`workPlan[${i}].day`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={day.day}
            error={isErrorDays(i, "day")}
          >
            {renderSelectMenu(daysSelect)}
          </Select>
        </FormControl>
        <FormControl
          margin="normal"
          required
          fullWidth
          // className={classes.inputLabel}
        >
          <TextField
            id="start"
            label="Начало рабочего дня"
            type="time"
            name={`workPlan[${i}].start`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={day.start}
            error={isErrorDays(i, "start")}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          fullWidth
          // className={classes.inputLabel}
        >
          <TextField
            id="end"
            label="Конец рабочего дня"
            type="time"
            name={`workPlan[${i}].end`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={day.end}
            error={isErrorDays(i, "end")}
          />
        </FormControl>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={async () => {
            await setFieldValue("actionName", "deleteDay");
            await setFieldValue("removeIndex", i);
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
    <div>
      <p className="title_bold title_big">Редактирование графика работы</p>
      {workPlan.map(renderInput)}
      <Button
        variant="contained"
        onClick={async () => {
          await setFieldValue("actionName", "addDay");
          handleSubmit();
        }}
      >
        Добавить рабочий день
      </Button>
    </div>
  );
}

export const WorkPlan = withStyles(styles)(WorkPlanComponent);

