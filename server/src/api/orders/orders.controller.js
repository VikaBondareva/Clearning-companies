const httpStatus = require("http-status");
const service = require("./orders.service");

module.exports.get = (req, res, next) => {
  service
    .getOrders(req.user, req.query)
    .then(orders => res.status(httpStatus.OK).json(orders))
    .catch(err => next(err));
};

module.exports.getById = (req, res, next) => {
  service
    .getByIdOrder(req.params.id, req.user._id)
    .then(order => res.status(httpStatus.OK).json(order))
    .catch(err => next(err));
};

module.exports.post = (req, res, next) => {
  service
    .createOrder(req.user.id, req.body)
    .then(result => {
      result
        ? res.status(httpStatus.OK).json("Ok")
        : res.status(httpStatus.BAD_REQUEST).json("BAD_REQUEST");
    })
    .catch(err => next(err));
};

module.exports.put = (req, res, next) => {
  service
    .changeStatus(req.user._id, req.params.id, req.body)
    .then(result => {
      result
        ? res.status(httpStatus.OK).json("Ok")
        : res.status(httpStatus.BAD_REQUEST).json("BAD_REQUEST");
    })
    .catch(err => next(err));
};

module.exports._delete = (req, res, next) => {
  service
    .deleteOrder(req.user._id, req.params.id)
    .then(result => {
      result
        ? res.status(httpStatus.OK).json("Ok")
        : res.status(httpStatus.NOT_FOUND).json("Not found order");
    })
    .catch(err => next(err));
};
