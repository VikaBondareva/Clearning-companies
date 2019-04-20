import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function ModalInputComponent(props) {
  const {
    maxWidth,
    fullWidth,
    title,
    inputValue,
    inputName,
    onChange,
    onClick,
    description,
    handleClose
  } = props;
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={true}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name={inputName}
          multiline
          rowsMax="6"
          value={inputValue}
          onChange={onChange}
          required
        //   className={classes.textField}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onClick} color="primary">
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalInputComponent.propTypes = {
  maxWidth: PropTypes.oneOf(["sm", "md", "xs"]),
  fullWidth: PropTypes.bool,
  description: PropTypes.string.isRequired,
  title: PropTypes.string
};

ModalInputComponent.defaultProps = {
  maxWidth: "sm",
  fullWidth: true,
  title: ""
};

export default ModalInputComponent;
