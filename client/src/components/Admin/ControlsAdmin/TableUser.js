import React from "react";
import PropTypes from "prop-types";
import { Button } from "../../common/buttons";
import './table.style.css';
import {
  getNameFormArray,
  statusUsersEnum,
  statusUsersArray,
  roles
} from "../../../utils";

export default function TableUsers({ list, total,renderButton }) {
  const renderTableUser = () => (
    <div>
      <p>
         Пользователей {total}
      </p>
        <div class="table-users">  
            <table cellspacing="0" className="table">
                <tr className="table-users-tr">
                    <th className="table-users-th">Name Surname</th>
                    <th className="table-users-th">Email</th>
                    <th className="table-users-th">Phone</th>
                    <th className="table-users-th">Status</th>
                    <th className="table-users-th" width="230">Registration date</th>
                    <th className="table-users-th" width="100">Action</th>
                </tr>
                {list.map(user => (
                <tr  key={user._id}  className="table-users-tr">
                    <td className="table-users-td td_name"> {user.name} {user.surname} </td>
                    <td className="table-users-td td_email">{user.email}</td>
                    <td className="table-users-td td_phone">{user.phone || "Отсуствует"}</td>
                    <td className="table-users-td td_status"> {getNameFormArray(statusUsersArray, user.status, "value")}</td>
                    <td className="table-users-td td_date"> {new Date(user.created_at).toISOString().substring(0, 10)}</td>
                    <td className="table-users-td"> {renderButton(user.status, user._id, user.lockMessage || null)}</td>
                </tr>
                ))}
            </table>
        </div>
    </div>
  );

  return renderTableUser();
}

TableUsers.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired
};