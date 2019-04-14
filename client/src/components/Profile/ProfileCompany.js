import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ButtonLink } from "../common/buttons";
import Table from "../common/table";

export default function ProfileCompanyComponent(props) {
  const { classes, company } = props;
  const {
    name,
    description,
    email,
    address,
    rooms,
    services,
    workPlan
  } = company;

  return (
    <>
      <div className="profile-basic main__profile-basic">
        <div className="profile-basic__info-company info-company">
          <div className="info-img">
            <img width="150px" height="150px" atl="company" scr="./pec.png" />
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
          </div>
        </div>
        <div className="profile-basic__info-company">
          <p className="title_standart title_bold"> Описание:</p>
          <p> {description} </p>
        </div>
        <ButtonLink
          name="Редатировать профиль"
          to="/profile/edit"
          margin="left"
          dark={true}
        />
        <ButtonLink
          name="Сменить пароль"
          dark={true}
          to="/profile/edit/password"
        />
      </div>
      <section className="profile-basic">
        <Table rooms={rooms} services={services} />
        <ButtonLink
          name="Редатировать цены"
          to="/profile/edit/services"
          dark={true}
        />
      </section>
    </>
  );
}

ProfileCompanyComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

// export default withStyles(styles)(ProfileCompanyComponent);
