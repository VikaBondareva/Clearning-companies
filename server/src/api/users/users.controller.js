const service = require("./users.service");
const httpStatus = require("http-status");

module.exports.get = async (req, res) => {
  service.getAllUsers(req.query).then(result => {
    result
      ? res.status(httpStatus.OK).json(result)
      : res.status(httpStatus.BAD_REQUEST).json("Bad request");
  });
};

module.exports.getById = async (req, res) => {
  res.send(`users getById!: ${req.params.id}`);
};

module.exports.put = async (req, res, next) => {
  service
    .update(req.user, req.body)
    .then(result => {
      result
        ? res.status(httpStatus.OK).json(result)
        : res.status(httpStatus.BAD_REQUEST).json("Bad request");
    })
    .catch(err => next(err));
};

module.exports._delete = async (req, res, next) => {
  service
    .deleteUser(req.params.id, req.body)
    .then(result => {
      result
        ? res.status(httpStatus.OK).json("Ok")
        : res.status(httpStatus.BAD_REQUEST).json("Bad request");
    })
    .catch(err => next(err));
};

module.exports.blockById = (req, res, next) => {
  service
    .blockUser(req.body, req.params.id)
    .then(company => res.status(httpStatus.OK).json(company))
    .catch(err => next(err));
};
