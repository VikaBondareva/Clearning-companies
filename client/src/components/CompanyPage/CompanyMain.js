import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Loader } from "../common/loading";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "../common/table";
import './style.css'
const styles = {
  card: {
    maxWidth: 480
  },
  logo: {
    width: 200
  }
};

function MainInformationCompany(props) {
  const {
    name,
    email,
    address,
    ratting,
    rooms,
    workPlan,
    services,
    description
  } = props.company;

  function renderWorkPlan(day, i) {
    return (
      <div key={i * 51 - i * 5}>
        <p>День: {day.day}</p>
        <p>
          Рабочие часы: {day.workHours.start} - {day.workHours.end}
        </p>
        {day.lanchHours && (
          <p>
            Обед: {day.lanchHours.start} - {day.lanchHours.end}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="title-card">
        <img width="150px" height="150px" atl="company" scr="./pec.png" />
        <div className="title-card__article">
          <div className="title-card__ratting">
            <p className="company-text">{name}</p>

            <div>
              <span className="stars stars--large">
                <span style={{ width: `${(ratting / 5.3) * 100}%` }} />
              </span>
            </div>
          </div>
          <p>Email: {email}</p>

          <p>
            Адрес: {address.country}, {address.city}, {address.other}
          </p>
        </div>
      </div>
      <div className="article">
        <p>{description}</p>
      </div>
      <div className="article">
        <Table rooms={rooms} services={services} />
      </div>
      <div>
        График работы
        {workPlan.map(renderWorkPlan)}
      </div>
    </div>
  );
}

MainInformationCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(MainInformationCompany);
