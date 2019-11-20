import React from "react";
import { Button } from "../../common/buttons";
import TableUsers from './TableUser';
import TableCompanies from './TableCompanies';
import {
  statusUsersEnum,
  roles
} from "../../../utils";

export default function TableCotrol({ list, total, role, handleClickStatus }) {

  const renderTableUser = () => {
      if(role === roles.user){
         return <TableUsers list={list} total={total} renderButton={renderButton} />
      } 
      return <TableCompanies list={list} total={total} renderButton={renderButton} />
  }

  const renderButton = (status, id, message) => {
    let name = "Заблокировать";
    let isDark = false
    let changeStatus = "block";
    if (status === statusUsersEnum.locked) {
      name = "Разблокировать";
      isDark = true;
      changeStatus = "unblock";
    }
    return (
      <Button
        name={name}
        isDark={isDark}
        onClick={() => handleClickStatus(changeStatus, id, message)}
      />
    );
  };

  return <div>{renderTableUser()}</div>;
}
