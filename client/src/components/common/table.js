import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styleTable.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function ProfileCompanyComponent(props) {
  const { classes, rooms,services } = props;

  const renderTableRooms = (rooms) => (
    <div>
      <p>Расценки на комнаты</p>
      <Table className={classes.table}>
        <TableHead>
          <TableCell />
          <TableCell align="right">Санузел</TableCell>
          <TableCell align="right">Маленькая команата</TableCell>
          <TableCell align="right">Большая комната</TableCell>
        </TableHead>
        <TableBody>
          <TableRow key={11}>
            <TableCell>Цена</TableCell>
            <TableCell align="right">{rooms.toilet.price}</TableCell>
            <TableCell align="right">{rooms.standart.price}</TableCell>
            <TableCell align="right">{rooms.big.price}</TableCell>
          </TableRow>
          <TableRow key={22}>
            <TableCell>Врремя уборки</TableCell>
            <TableCell align="right">{rooms.toilet.time}</TableCell>
            <TableCell align="right">{rooms.standart.time}</TableCell>
            <TableCell align="right">{rooms.big.time}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  const renderTableServices = (services) => (
    <div>
        <p>Расценки услуг</p>
      <Table className={classes.table}>
        <TableHead>
          <TableCell  >Название услуги</TableCell>
          <TableCell >Коэффициент</TableCell>
        </TableHead>
        <TableBody>
            {services.map(service=>(
                 <TableRow key={service._id}>
                 <TableCell >{service.name}</TableCell>
                 <TableCell >{service.coefficient}</TableCell>
               </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      {renderTableRooms(rooms)}
      {renderTableServices(services)}
    </>
  );
}

ProfileCompanyComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileCompanyComponent);
