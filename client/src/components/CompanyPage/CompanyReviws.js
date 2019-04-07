import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    maxWidth: 480,
  },
  logo: {
    width: 200,
  },
};

function CompanyReviewsComponent({reviews: {page,docs, pages, total}, onClick}){

    const isShowButton = (page!==pages)? true : false;

    const renderReview = review => {
     return (
        <>
          <div key={review._id}>
            <p>Date: {new Date(review.created_at).toISOString()}</p>
            <p>Ratting: {review.ratting}</p>
            <p>Text: {review.reviewText}</p>
          </div>
        </>
      )
    }
    if(!docs) {
      return <p>Not reviews</p>
    }
    return (
      <div>
        <p>Отзывов: {total}</p>
        {docs.map(renderReview)}
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