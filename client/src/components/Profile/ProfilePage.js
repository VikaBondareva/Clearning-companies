import React, { Component } from "react";
import ProfileCompany from "./ProfileCompany";
import ProfileUser from "./ProfileUser";
import ButtonProfile from "./ButtonsProfile";
import PropTypes from "prop-types";
import { roles } from "../../helpers";
import "./style/style.css";

export default function Profile(props) {
  function renderProfile() {
    const { role, profile } = props;
    if (role !== roles.executor) {
      return <ProfileUser user={profile} />;
    } else return <ProfileCompany company={profile} />;
  }

  return (
    <div className="profile-main main__profile-main">
      <p>Профиль</p>
      <main className="profile-main__card-info">{renderProfile()}</main>
      <ButtonProfile role={props.profile.role} />
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired
};
