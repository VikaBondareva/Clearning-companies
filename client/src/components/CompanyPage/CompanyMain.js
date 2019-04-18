import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "../common/table";
import companyImg from '../../static/img/default-company.jpg';
import {WorkPlanCompany} from '../common/company-forms';
import './style.css'

export default function MainInformationCompany(props) {
  const {
    name,
    email,
    address,
    ratting,
    rooms,
    workPlan,
    services,
    logoUrl,
    logoName,
    description
  } = props.company;

const imgSrc = logoUrl || companyImg;
  return (
    <div>
      <div className="title-card">
         <img width="150px" height="150px" src={imgSrc} alt={logoName} />
        <div className="title-card__article">
          <div className="title-card__ratting">
            <p className="title_big">{name}</p>

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
        <div>
         <p className="title_big"> График работы </p>
          <WorkPlanCompany workPlan={workPlan}/>
        </div>
      </div>
      <div className="article">
        <Table rooms={rooms} services={services} />
      </div>
    </div>
  );
}

MainInformationCompany.propTypes = {
  company: PropTypes.object.isRequired
};