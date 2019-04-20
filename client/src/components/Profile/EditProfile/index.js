import React, { Component } from "react";
import {EditCompany} from "./Company";
import {EditUser} from "./User";
import loadingHOC from '../../common/loading/loadingHOC'
// import ButtonsEdit from "./ButtonsEdit";
import PropTypes from "prop-types";
import { roles } from "../../../utils";

function EditProfile(props) {

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
      {props.error && <p>Something be wrong</p>}
      {renderProfileEdit()}
    </div>
  );
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  saveChanges: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};
export  const EditProfilePage = loadingHOC("isLoading")(EditProfile);