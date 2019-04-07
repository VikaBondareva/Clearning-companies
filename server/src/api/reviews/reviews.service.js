const Review = require("../../models").review;
const { middleRatting } = require("../../config/pricingFunction");
const Company = require("../../models").company;

async function createReview(customerId, { ratting, reviewText, company }) {
  try {
    await new Review({
      ratting,
      reviewText,
      customer: customerId,
      company
    }).save();
    const reviews = await Review.find({ company });
    const rattingCompany = middleRatting(reviews);
    await Company.updateOne(
      { _id: company },
      { $set: { ratting: rattingCompany } }
    );
    return true;
  } catch {
    return false;
  }
}

async function getReviews({ _id }, { page, perPage }) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 20,
    populate: [
      { path: "customer", select: "name surname email phone" },
      { path: "company", select: "name email" }
    ],
    sort: "-updated_at"
  };
  const query = {
    $or: [{ company: _id }, { customer: _id }]
  };
  const reviews = await Review.paginate(query, options);
  return reviews;
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

async function getByIdReview(_id) {
  return await Review.findById(_id)
    .populate({ path: "customer", select: "name surname email phone" })
    .populate({ path: "company", select: "name email" })
    .exec();
}

async function updateReview(_id, customer, { ratting, reviewText }) {
  console.log(ratting);
  try {
    const review = await Review.findOneAndUpdate(
      { _id, customer },
      { $set: { ratting, reviewText } },
      { new: true }
    );
    return review;
  } catch (err) {
    throw err;
  }
}

async function deleteReview(_id, customer) {
  return await Review.remove({ _id, customer });
}

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  getByIdReview,
  getByIdReviewsCompany
};
