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



const styles = {
  card: {
    maxWidth: 480,
  },
  logo: {
    width: 200,
  },
};

class CompanyPage extends Component{

    componentWillMount(){
        const {match: {params}} = this.props;
        console.log(params.id);
        this.props.getCompany(params.id);
    }

    render(){
        const {classes, company} = this.props;
        const {name, address, ratting, workPlan, services,description} = company;
        if(!company){
          throw new Error('Not found company');
        }
        return (
          <Card className={classes.card}>
            <CardActionArea>
              <Grid container >
                  <Grid item className={classes.logo}>
                     <SearchIcon/>
                  </Grid>
                  <Grid item xs>
                      <Typography gutterBottom variant="h5">
                          {name}
                      </Typography>
                      <Typography gutterBottom >
                          Address: {address.city},str. {address.street} {address.house}  
                      </Typography>
                  </Grid>
                  <Grid item >
                      <Typography gutterBottom>
                      Ratting {+ratting}
                      </Typography>
                  </Grid>
              </Grid>
             
              <CardContent>
                <Typography gutterBottom component="h4">
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
}

CompanyPage.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

export default withStyles(styles)(CompanyPage);