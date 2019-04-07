import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../common/loading/loader';
import MainInformation from './CompanyMain';
import Reviews from './CompanyReviws'
import {Link} from 'react-router-dom';

const styles = {
  section: {
    width: "100%",
  },
};

class CompanyPage extends Component{

    constructor(){
      super()

      this.state = {
        page: 1
      };

      this.handleClickShowReviews =this.handleClickShowReviews.bind(this);
      this.renderButtons =this.renderButtons.bind(this);
      this.renderCompany =this.renderCompany.bind(this);
      this.renderError =this.renderError.bind(this);
    }

    componentDidMount(){
      const {match: {params}} = this.props;
      this.props.getCompany(params.id);
    }

    handleClickShowReviews(){
      const page = this.state.page+1;
      console.log(page);
      this.setState({page})
      this.props.getReviews(this.props.company._id,page);
    }

    renderCompany=()=>{
      return (
        <>
          <MainInformation company={this.props.company}/> 
          {this.renderButtons()}
          <Reviews reviews={this.props.company.reviews} onClick={this.handleClickShowReviews}/>
        </>
      );  
    }

    renderButtons(){
      return (
        <div >
            <Link to='/booking'>
              <Button size="small" variant="contained" color="primary">
                Сделать заказ
              </Button>
            </Link>

            <Button size="small" variant="contained" color="primary">
                Оставить отзыв
              </Button>
        </div>
      );
    }

    renderError(){
      const {match: {params}} = this.props;
      throw new Error("Not found "+params.id);
    }

    render(){
        const { company, classes, isLoading} = this.props;
        if(isLoading){
          return <Loader />
        }
        return (
          <div className={classes.section}>
              {company
                ? this.renderCompany()
                // : this.renderError()
                : "Not found"
              }
          </div>
        );
    }
}

CompanyPage.propTypes = {
  classes: PropTypes.object.isRequired,
  company: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

export default (withStyles(styles)(CompanyPage));