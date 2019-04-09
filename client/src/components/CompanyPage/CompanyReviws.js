import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Review from './Review/ReviewComponent';

const styles = {
  reviewsSection: {
   
  }
};

function CompanyReviewsComponent({reviews: {page,docs, pages, total}, onClick, classes}){

    const isShowButton = (page!==pages)? true : false;

    const renderReview = review => {
     return (
            <Review 
              key={review._id}
              text={review.reviewText}
              ratting={review.ratting}
              date={new Date(review.created_at).toISOString()}
              name={review.customer.name}
            />
      )
    }
    if(!docs) {
      return <p>Not reviews</p>
    }
    return (
      <div className={classes.reviewsSection}>
        <p>Отзывов: {total}</p>
        <div >
          {docs.map(renderReview)}
        </div> 
        {isShowButton 
          ?   <Button size="small" variant="contained" color="primary" onClick={onClick}>
                Загрузить еще
            </Button>
          : null
        }
      </div>
    )
}

CompanyReviewsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  reviews: PropTypes.object,
};

export default withStyles(styles)(CompanyReviewsComponent);