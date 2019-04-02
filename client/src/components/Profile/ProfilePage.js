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

import {Link, Redirect} from 'react-router-dom'; 

const styles = {
  card: {
    width: "100%",
    minHeight: 520
  }
};

class ProfilePageComponent extends Component {

    renderAddresses = (address, i)=>{
        return (
            <Typography gutterBottom key={i} >
                {address}         
            </Typography>
        );
    }

    componentWillMount(){
        this.props.getCurrentUser();
    }

    render() {
    const {classes,user} = this.props;
    const {name,surname, email, addresses, phone} = user;
    return (
      
      <Card className={classes.card}>
        <CardActionArea>
          <Grid container  alignItems="flex-start">
              <Grid item xs>
                  <Typography gutterBottom variant="h5">
                      {name}  {surname}
                   </Typography>
              </Grid>
          </Grid>
         
          <CardContent>
            {/* <div>
                Addresses:   {addresses.map(this.renderAddresses)} 
            </div> */}
            <p>
                Email:   {email} 
            </p>
            <p>
                Phone:   {phone} 
            </p>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to='/profile/edit'>Edit profile</Link>
          </Button>
          <Button size="small" color="primary">
            <Link to='/orders'>My orders</Link>
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ProfilePageComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePageComponent);