import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Loader from '../common/loading/loader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    maxWidth: 480,
  },
  logo: {
    width: 200,
  },
};

function MainInformationCompany(props){

    const {name,email, address, ratting,rooms, workPlan, services,description} = props.company;

    function renderServices(service){
      return (
          <div key={service._id}>
            <p>Name: {service.name}</p>
            <p>Coefficient: {service.coefficient}</p>
          </div>
      );
    }

    function renderWorkPlan(day, i){
       return (
          <div key={i*51-i*5}>
            <p>Day: {day.day}</p>
            <p>work hours: {day.workHours.start} - {day.workHours.end}</p>
            {day.lanchHours && <p>lanch hours: {day.lanchHours.start} - {day.lanchHours.end}</p>} 
          </div>
      );
    }

    return (
        <div >
            <div className="title">
                <img width="150px" height="150px" atl="company" scr="./pec.png" />
                <p>{name}</p>
                <p>Email: {email}</p>
                 <p>Ratting: {ratting}</p>
                <p>Address: {address.country}, {address.city}, {address.other}</p>
            </div>
            <div className="article">
              <p>{description}</p>
            </div>
            <div className="article">
              <div className='card-room'>
                Toilet
                <p>Price: {rooms.toilet.price}</p>
                <p>Time: {rooms.toilet.time}</p>
              </div>
              <div className='card-room'>
                Standart
                <p>Price: {rooms.standart.price}</p>
                <p>Time: {rooms.standart.time}</p>
              </div>
              <div className='card-room'>
                Big
                <p>Price: {rooms.big.price}</p>
                <p>Time: {rooms.big.time}</p>
              </div>
            </div>
            <div>
              Services
              {services.map(renderServices)}
            </div>
            <div>
              Work plan
              {workPlan.map(renderWorkPlan)}
            </div>
        </div>
    );
}

MainInformationCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

export default (withStyles(styles)(MainInformationCompany));