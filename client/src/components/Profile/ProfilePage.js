import React, { Component } from "react";
import ProfileCompany from "./ProfileCompany";
import ProfileUser from "./ProfileUser";
import ButtonProfile from './ButtonsProfile';
import PropTypes from "prop-types";
import { roles } from "../../helpers";
import './style/style.css';

export default class Profile extends Component {

  renderProfile(){
    const {role,profile}= this.props;
    if (role === roles.user) {
      return <ProfileUser user={profile} />;
    } else if (role === roles.executor)
      return <ProfileCompany company={profile} />;
  }

  render() {
    return(
      <div className="profile-main main__profile-main">
          <p>Профиль</p>
          <main className="profile-main__card-info">
            {this.renderProfile()}   
          </main>
          <ButtonProfile />
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired
};

