const Review = require("../../models").review;
const { middleRatting } = require("../../config/pricingFunction");
const { mainNewReviewForCompany } = require("../../config/email");
const Company = require("../../models").company;

async function createReview(customer, { ratting, reviewText, company }) {
  try {
    const review = await new Review({
      ratting,
      reviewText,
      customer,
      company
    }).save();
    const reviews = await Review.find({ company });
    const rattingCompany = middleRatting(reviews);
    const companyFind = await Company.findByIdAndUpdate(company, {
      $set: { ratting: rattingCompany }
    });
    companyFind.sendMailMessage(
      mainNewReviewForCompany(companyFind.name, reviewText)
    );
    return review;
  } catch (err) {
    return false;
  }
}

async function getByIdReviewsCompany(_id, { page }) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: 5,
    populate: [{ path: "customer", select: "name surname email phone" }],
    sort: "-created_at"
  };
  const query = {
    company: _id
  };

  const reviews = await Review.paginate(query, options);
  return reviews;
}
async function deleteReview(_id, customer) {
  return await Review.remove({ _id, customer });
}

module.exports = {
  createReview,
  deleteReview,
  getByIdReviewsCompany
};
