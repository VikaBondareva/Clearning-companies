import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

import {Link} from 'react-router-dom'; 

const styles = {
  card: {
    maxWidth: 450,
  },
  logo: {
    width: 200,
    height: 100
  },
};

class CardCompanyComponent extends Component {

  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
    this.renderAddress = this.renderAddress.bind(this);
    this.renderWorkPlan = this.renderWorkPlan.bind(this);
  }


  handleClick(){
      console.log(this.props);
  };

  renderAddress(){
    const {address} = this.props.company;

    return (
      <>
       <p>{address.city}, {address.district && `район ${address.district}`} </p>
      </>
    );  
  }

  renderWorkPlan(day){
    return (
      <div key={day._id}>
          <p>{day.day}: {day.workHours.start} - {day.workHours.end}</p>
          {day.lanchHours && <p>{day.lanchHours.start} - {day.lanchHours.end}</p>}
      </div>
    );
  }

  render() {
    const {classes} = this.props;
    const {name,address, ratting, _id,workPlan, rooms} = this.props.company;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <Grid container  alignItems="flex-start">
              <Grid item className={classes.logo}>
                 <SearchIcon/>
              </Grid>
              <Grid item xs>
                  <Typography gutterBottom variant="h5">
                      {name}
                  </Typography>
                  <Typography gutterBottom variant="p">
                      Адрес:   {address.city} {address.district && `, район ${address.district}`}, улица {address.street}, дом {address.house}
                      {address.apartment && `, квартира ${address.apartment}`} 
                  </Typography>
              </Grid>
              <Grid item alignItems="center">
                  <Typography gutterBottom variant="p">
                  Ratting {+ratting}
                  </Typography>
              </Grid>
          </Grid>
         
          <CardContent>
            <Typography gutterBottom variant="p" component="h4">
               График работы
                {workPlan.map(this.renderWorkPlan)}
            </Typography>
            <Typography component="p">
             <p> Цена за маленькую конмнату: {rooms.standart.price} руб</p>
              <p>Цена за большую конмнату: {rooms.big.price} руб</p>
              <p>Цена за туалет : {rooms.toilet.price} руб</p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClick}>
            Заказать услугу
          </Button>
          <Button size="small" color="primary" onClick={this.handleClick}>
            <Link to={`/companies/${_id}`}>See</Link>
          </Button>
        </CardActions>
      </Card>
    );
  }
}

CardCompanyComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(CardCompanyComponent);