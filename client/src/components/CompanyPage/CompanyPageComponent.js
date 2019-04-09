import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Loader} from '../common/loading';
import MainInformation from './CompanyMain';
import Reviews from './CompanyReviws'
import {Link} from 'react-router-dom';
import {ReviewForm} from './ReviewForm';

const styles = {
  section: {
    width: "100%",
  },
  mainSection: {
    marginLeft: 50,
    marginRight: 50
  }
};

class CompanyPage extends Component{

    constructor(){
      super()

      this.state = {
        page: 1,
        isShowFormReview: false
      };

      this.handleClickShowReviews =this.handleClickShowReviews.bind(this);
      this.handleClickIsShowFromReview =this.handleClickIsShowFromReview.bind(this);
      this.handleClickAddNewReview =this.handleClickAddNewReview.bind(this);
      this.renderButtons =this.renderButtons.bind(this);
      this.renderCompany =this.renderCompany.bind(this);
      // this.renderError =this.renderError.bind(this);
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

    handleClickIsShowFromReview(){
      this.setState({
        isShowFormReview: !this.state.isShowFormReview
      })
    }

    handleClickAddNewReview(ratting, reviewText){
      const {company} = this.props;
      this.props.createReview({ratting, reviewText, company: company._id});
      this.handleClickIsShowFromReview();
    }

    renderCompany(classes){
      return (
        <div className={classes.mainSection}>
          <MainInformation company={this.props.company}/> 
          {this.renderButtons()}
          <Reviews reviews={this.props.company.reviews} onClick={this.handleClickShowReviews}/>
        </div>
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
            {this.state.isShowFormReview
              ? <ReviewForm isAuth={this.props.isAuthenticated} onClick={this.handleClickAddNewReview} />
              : <Button size="small" variant="contained" color="primary" onClick={this.handleClickIsShowFromReview}>
                  Оставить отзыв
                </Button>
            }
        </div>
      );
    }

    // renderError(){
    //   const {match: {params}} = this.props;
    //   throw new Error("Not found "+params.id);
    // }

    render(){
        const { company, classes, isLoading} = this.props;
        if(isLoading){
          return <Loader />
        }
        return (
          <div className={classes.section}>
              {company
                ? this.renderCompany(classes)
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
  userId: PropTypes.string,
  createReview: PropTypes.func.isRequired
};

export default (withStyles(styles)(CompanyPage));