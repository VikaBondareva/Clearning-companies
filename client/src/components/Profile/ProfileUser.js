import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styles from './style/style.js';

class ProfileUserComponent extends Component {
  renderAddresses = (address, i) => {
    const { classes } = this.props;
    return (
      <>
        <Typography gutterBottom key={i} className={classes.text}>
          {address}
        </Typography>
      </>
    );
  };

  render() {
    const { classes, user } = this.props;
    const { name, surname, email, addresses, phone } = user;
    return (
      <>
        <div className={classes.title}>
          {name} {surname}
        </div>
        <div className={classes.info}>
          {email && (
            <div className={classes.table}>
              <p> Email:</p>
              <p> {email} </p>
            </div>
          )}
          {phone && (
            <div className={classes.table}>
              <p> Phone:</p>
              <p> {phone} </p>
            </div>
          )}
        </div>
        <div className={classes.table}>
          Addresses:
          <div>{addresses.map(this.renderAddresses)}</div>
        </div>
      </>
    );
  }
}

ProfileUserComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileUserComponent);
