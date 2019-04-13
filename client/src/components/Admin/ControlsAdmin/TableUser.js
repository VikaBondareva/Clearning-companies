import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import styles from "../style/style.js";
import Table from "@material-ui/core/Table";
import { Button } from "../../common/buttons";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  getNameFormArray,
  statusUsersEnum,
  statusUsersArray,
  roles
} from "../../../helpers";

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  }
});

function TableUsers({ list, total, role, handleClickStatus, classes }) {
  const renderTableOrders = () => (
    <div>
      <p>
        {role === roles.user ? "Пользователей" : "Компаний"}: {total}
      </p>
      <Table>
        <TableHead>
          <TableCell align="left">
            Имя {role === roles.user && "Фамилия"}
          </TableCell>
          <TableCell align="left">Email</TableCell>
          {role === roles.user && <TableCell align="left">Телефон</TableCell>}
          <TableCell align="left">Статус</TableCell>
          <TableCell align="left">Дата регистрации</TableCell>
          <TableCell align="left">Действие</TableCell>
        </TableHead>
        <TableBody>
          {list.map(user => (
            <TableRow
              key={user._id}
              className={(classes.table, classes.tableRowHover)}
            >
              <TableCell align="left">
                {user.name} {user.surname || ""}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              {role === roles.user && (
                <TableCell align="left">{user.phone}</TableCell>
              )}
              <TableCell align="left">
                {getNameFormArray(statusUsersArray, user.status, "value")}
              </TableCell>
              <TableCell align="left">
                {new Date(user.created_at).toISOString().substring(0, 10)}
              </TableCell>
              <TableCell align="left">
                {renderButton(user.status, user._id, user.lockMessage || null)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderButton = (status, id, message) => {
    let name = "Заблокировать";
    let changeStatus = "block";
    if (status === statusUsersEnum.locked) {
      name = "Разблокировать";
      changeStatus = "unblock";
    }
    return (
      <Button
        name={name}
        onClick={() => handleClickStatus(changeStatus, id, message)}
      />
    );
  };

  return <div>{renderTableOrders()}</div>;
}

TableUsers.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired
};

export default withStyles(styles)(TableUsers);
