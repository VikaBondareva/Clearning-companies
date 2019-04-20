import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../common/buttons";
import TableUsers from './TableUser';
import TableCompanies from './TableCompanies';
// import TableCell from '../../common/tables/row-user-table';
import {
  getNameFormArray,
  statusUsersEnum,
  statusUsersArray,
  roles
} from "../../../utils";

export default function TableCotrol({ list, total, role, handleClickStatus, classes }) {

  const renderTableUser = () => {
      if(role === roles.user){
         return <TableUsers list={list} total={total} renderButton={renderButton} />
      } 
      return <TableCompanies list={list} total={total} renderButton={renderButton} />
  }

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

  return <div>{renderTableUser()}</div>;
}

TableCotrol.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired
};