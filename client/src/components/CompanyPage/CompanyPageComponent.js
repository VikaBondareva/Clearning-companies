import React, {Component} from 'react';
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


import ApiService from '../../services/companies.service';

const styles = {
  card: {
    maxWidth: 480,
  },
  logo: {
    width: 200,
  },
};

class CompanyPage extends Component{

    state = {
        name: '',
        description: '',
        address: '',
        services: '',
        ratting: '',
        workPlan: '',
        rooms: '',
        email:''
    }

    componentDidMount(){
        const {match: {params}} = this.props;
        console.log(params.id);
        ApiService.getCompanyById(params.id)
            .then(res=>{
                const {name, description, address, services,email, ratting, workPlan, rooms} = res.data;
                this.setState({
                    name,
                    description,
                    address,
                    services,
                    ratting,
                    workPlan,
                    rooms,
                    email
                })
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    render(){
    console.log(this.props);

        const {classes} = this.props;
        const {name, address, ratting, workPlan, services,description} = this.state;
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
};

export default withStyles(styles)(CompanyPage);