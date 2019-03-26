import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  card: {
    maxWidth: 380,
  },
  logo: {
    width: 150,
  },
};

function CardCompanyComponent({ classes, company }) {
  const {name, address, ratting} = company;
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
                    Address: {address.city},str. {address.street} {address.house}  
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
             Schedule work
          </Typography>
          <Typography component="p">
            Middle price: 15 by
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Order service
        </Button>
      </CardActions>
    </Card>
  );
}

CardCompanyComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(CardCompanyComponent);