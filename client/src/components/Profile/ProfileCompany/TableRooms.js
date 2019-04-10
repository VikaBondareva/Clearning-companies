import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style/style.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

  const renderTableRooms = () => (
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Санузел</TableCell>
            <TableCell align="right">Маленькая команата</TableCell>
            <TableCell align="right">Большая комната</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={row.id}>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow key={row.id}>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow key={row.id}>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </>
  );

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
    </>
  );
}

ProfileCompanyComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileCompanyComponent);
