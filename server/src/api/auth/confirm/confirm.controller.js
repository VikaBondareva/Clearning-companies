const httpStatus = require("http-status");
const service = require("./confirm.service");

module.exports.activationEmail = (req, res, next) => {
  service
    .activationEmail(req.user)
    .then(results =>
      results
        ? res.status(httpStatus.OK).json(results)
        : res
            .status(httpStatus.BAD_REQUEST)
            .json({ success: false, message: "Invalid token" })
    )
    .catch(err => next(err));
};

module.exports.activationCode = (req, res, next) => {
  service
    .activationCode(req.body)
    .then(results =>
      results
        ? res.status(httpStatus.OK).json(results)
        : res
            .status(httpStatus.BAD_REQUEST)
            .json({ success: false, message: "Invalid token" })
    )
    .catch(err => next(err));
};

module.exports.verifiedNewEmail = (req, res, next) => {
  service
    .verifiedEmail(req.user)
    .then(() => res.status(httpStatus.OK).json("success"))
    .catch(err => next(err));
};

module.exports.newCode = (req, res, next) => {
  service
    .createNewCode(req.body)
    .then(() => res.status(httpStatus.OK).json("success"))
    .catch(err => next(err));
};
