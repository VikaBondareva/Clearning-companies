import React from "react";
import ProfileCompany from "./ProfileCompany";
import ProfileUser from "./ProfileUser";
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
        </>
      );
    } else return <ProfileCompany company={profile} />;
  }

  return (
    <div className="main__section">
      <main>{renderProfile()}</main>
    </div>
  );
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired
};
