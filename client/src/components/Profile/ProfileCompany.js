import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style/style.js";
import Table from "../common/table";

function ProfileCompanyComponent(props) {
  const { classes, company } = props;
  const {
    name,
    description,
    email,
    address,
    rooms,
    services,
    workPlan
  } = company;

  return (
    <>
      <div className={classes.title}>{name}</div>
      <div className={classes.info}>
        <div className={classes.table}>
          <p> Email:</p>
          <p> {email} </p>
        </div>
        <div className={classes.table}>
          <p> Описание:</p>
          <p> {description} </p>
        </div>
      </div>
      <div className={classes.table}>
        Адрес: {address.country}, {address.city}, {address.other}
      </div>
      <Table rooms={rooms} services={services} />
    </>
  );
}

ProfileCompanyComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileCompanyComponent);
