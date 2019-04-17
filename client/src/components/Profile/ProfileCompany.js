import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {ButtonLink} from '../common/buttons'
import { withStyles } from "@material-ui/core/styles";
import Table from "../common/table";
import companyImg from '../../static/img/default-company.jpg';

export default function ProfileCompanyComponent(props) {
  const { classes, company } = props;
  const {
    _id,
    name,
    description,
    email,
    address,
    rooms,
    logoUrl,
    logoName,
    services,
    workPlan
  } = company;

const imgSrc = logoUrl || companyImg;
  return (
    <>
      <div className="profile-basic main__profile-basic">
        <div className="profile-basic__info-company info-company">
          <div className="info-img">
            <img width="150px" height="150px" src={imgSrc} alt={logoName || "not logo"} />
            <ButtonLink name="Сменить логотип" to="/profile/edit/logo"/>
          </div>

          <div>
            <div className="title_big title_bold">{name}</div>
            <div>
              <p> Email: {email}</p>
            </div>
            <div>
              <p>
                Адрес: {address.country}, {address.city}, {address.other}
              </p>
            </div>
            <div>
              <Link to={`/companies/${_id}`}>Моя страница на сайте</Link>
            </div>
          </div>
        </div>
        <div className="profile-basic__info-company">
          <p className="title_standart title_bold"> Описание:</p>
          <p> {description} </p>
        </div>
      </div>
      <section className="profile-basic">
        <Table rooms={rooms} services={services} />
      </section>
    </>
  );
}

ProfileCompanyComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

// export default withStyles(styles)(ProfileCompanyComponent);
