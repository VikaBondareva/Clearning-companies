import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../style/style.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getNameFormArray, statusOrdersArray } from "../../../utils";

function TableOrders({orders,classes,handleClick}) {
  const renderTableOrders = () => (
    <Table>
      <TableHead>
        <TableCell align="left">Типы слуг</TableCell>
        <TableCell align="left">Дата уборки</TableCell>
        <TableCell align="left">Ожидаемое время начала</TableCell>
        <TableCell align="left">Статус</TableCell>
      </TableHead>
      <TableBody>
        {orders.map(order => (
          <TableRow
            key={order._id}
            onClick={() => handleClick(order._id)}
            className={
              (classes.table, classes.tableRowHover)
            }
          >
            <TableCell align="left">
              {order.service}
            </TableCell>
            <TableCell align="left">{order.date}</TableCell>
            <TableCell align="left">{order.startTime}</TableCell>
            <TableCell align="left">
              {getNameFormArray(statusOrdersArray, order.status, "value")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return renderTableOrders(orders);
}

TableOrders.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
};

export default withStyles(styles)(TableOrders);
