import React, { Component } from "react";
import ProfileCompany from "./ProfileCompany";
import ProfileUser from "./ProfileUser";
import ButtonProfile from "./ButtonsProfileUser";
import PropTypes from "prop-types";
import { roles } from "../../utils";
import "../style/main.css";

export default function Profile(props) {
  function renderProfile() {
    const { role, profile } = props;
    if (role !== roles.executor) {
      return (
        <>
          <ProfileUser user={profile} />
          <ButtonProfile role={props.profile.role} />
        </>
      );
    } else return <ProfileCompany company={profile} />;
  }

  return (
    <div className="main__section">
      <p className="title_big title_bold">Профиль</p>
      <main>{renderProfile()}</main>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired
};
