import React, { Component } from "react";
import {EditCompany} from "./Company";
import {EditUser} from "./User";
// import ButtonsEdit from "./ButtonsEdit";
import PropTypes from "prop-types";
import { roles } from "../../../utils";

export function EditProfilePage(props) {

  function renderProfileEdit() {
    const { role, profile } = props;
    if (role !== roles.executor) {
      return <EditUser user={profile} saveChanged={saveChanged}/>;
    } else return <EditCompany company={profile} saveChanged={saveChanged} />;
  }

  function saveChanged(data){
    props.saveChanges(data, props.role);
  }

  return (
    <div className="main__section-form">
      <h3 className="title_bold title_big">Редактирование аккаунта</h3>
      {renderProfileEdit()}
    </div>
  );
}

EditProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired
};
