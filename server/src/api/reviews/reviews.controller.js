const httpStatus = require("http-status");
const service = require("./reviews.service");

module.exports.get = async (req, res, next) => {
  service
    .getReviews(req.user, req.query)
    .then(data => res.status(httpStatus.OK).json(data))
    .catch(err => next(err));
};

module.exports.getById = (req, res, next) => {
  service
    .getByIdReview(req.params.id)
    .then(data => res.status(httpStatus.OK).json(data))
    .catch(err => next(err));
};

module.exports.post = async (req, res, next) => {
  service
    .createReview(req.user._id, req.body)
    .then(result => {
      result
        ? res.status(httpStatus.OK).json("created review")
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
