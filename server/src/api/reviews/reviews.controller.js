const httpStatus = require("http-status");
const service = require("./reviews.service");

module.exports.get = async (req, res, next) => {
  service
    .getReviews(req.user, req.query)
    .then(data => res.status(httpStatus.OK).json(data))
    .catch(err => next(err));
};

module.exports.getReviewsCompany = (req, res, next) => {
  service
    .getByIdReviewsCompany(req.params.id, req.query)
    .then(data => {
      console.log(data);
      res.status(httpStatus.OK).json(data);
    })
    .catch(err => next(err));
};

module.exports.post = async (req, res, next) => {
  service
    .createReview(req.user._id, req.body)
    .then(result => {
      console.log(result);
      result
        ? res.status(httpStatus.OK).json(result)
        : res.status(httpStatus.BAD_REQUEST).json("BAD REQUEST");
    })
    .catch(err => next(err));
};

module.exports.put = async (req, res, next) => {
  service
    .updateReview(req.params.id, req.user._id, req.body)
    .then(data => res.status(httpStatus.OK).json(data))
    .catch(err => next(err));
};

module.exports._delete = async (req, res, next) => {
  service
    .deleteReview(req.params.id, req.user._id)
    .then(res.status(httpStatus.OK).json("Ok"))
    .catch(err => next(err));
};
