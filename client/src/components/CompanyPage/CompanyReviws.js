import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Review from "./Review/ReviewComponent";
import { Loader } from "../common/loading";

function CompanyReviewsComponent({ reviews, onClick }) {
  const isShowButton = reviews && reviews.page !== reviews.pages ? true : false;

  const renderReview = review => {
    return (
      <Review
        key={review._id}
        text={review.reviewText}
        ratting={review.ratting}
        date={new Date(review.created_at).toISOString()}
        name={review.customer ? review.customer.name : "Unkognito"}
      />
    );
  };
  if (!reviews || (reviews && !reviews.docs)) {
    return <p>Нет отзывов</p>;
  }
  return (
    <>
      <p>Отзывов: {reviews.total}</p>
      <div>{reviews.docs.map(renderReview)}</div>
      {isShowButton ? (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Загрузить еще
        </Button>
      ) : null}
    </>
  );
}

CompanyReviewsComponent.propTypes = {
  reviews: PropTypes.object,
  isLoading: PropTypes.bool
};

export default CompanyReviewsComponent;
