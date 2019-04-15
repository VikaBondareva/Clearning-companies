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
import './style.css';
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
    this.renderAddress = this.renderAddress.bind(this);
    this.renderWorkPlan = this.renderWorkPlan.bind(this);
  }

  renderAddress(){
    const {address} = this.props.company;

    return (
      <>
       <p>{address.country}, {address.city}  {address.other} </p>
      </>
    );  
  }

  renderWorkPlan(day){
    return (
          <p  key={day.day}>{day.day}: {day.start} - {day.end}</p>
    );
  }

  render() {
    const {classes} = this.props;
    const {name,address, ratting, _id,workPlan, rooms, price} = this.props.company;
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
                  <Typography gutterBottom >
                      Адрес:   {address.country}, {address.city}, {address.other && `${address.other }`}
                  </Typography>
              </Grid>
              <Grid item>
              {ratting}
                <span className="stars stars--large">
                  <span style={{width: `${ratting/5.3*100}%`}} />
                </span>
              </Grid>
          </Grid>
          <CardContent>
            <div >
               <p>График работы</p>
                {workPlan.map(this.renderWorkPlan)}
            </div>
            <div>
             <p> Цена за маленькую конмнату: {rooms.standart.price} руб</p>
              <p>Цена за большую конмнату: {rooms.big.price} руб</p>
              <p>Цена за туалет : {rooms.toilet.price} руб</p>
            </div>
            <div>
              Средняя цена {price}
            </div>  
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={()=>this.props.onClick(_id)}>
            Заказать услугу
          </Button>
          <Button size="small" color="primary" >
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