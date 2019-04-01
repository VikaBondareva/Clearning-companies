const httpStatus = require("http-status");
const authService = require("./auth.service");
const Role = require("../../enums/roles.enum");

module.exports.login = (req, res, next) => {
  authService
    .authenticate(req.body)
    .then(results => {
      console.log(results);
      results
        ? res.json(results)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: "Email/phone or password is incorrect" });
    })
    .catch(err => next(err));
};

module.exports.logout = (req, res, next) => {
  authService.logout(req.refreshToken).then(result => {
    result
      ? res.status(httpStatus.OK).json("Ok")
      : res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Internal Error");
  });
};

module.exports.registerUser = (req, res, next) => {
  authService
    .register(req.body, Role.Customer)
    .then(result => {
      result
        ? res.status(httpStatus.CREATED).json("created user")
        : res.status(httpStatus.BAD_REQUEST).json({ message: "BAD REQUEST" });
    })
    .catch(err => next(err));
};

module.exports.registerCompany = (req, res, next) => {
  authService
    .registerCompany(req.body, Role.Executor)
    .then(result => {
      result
        ? res.status(httpStatus.CREATED).json("created company")
        : res.status(httpStatus.BAD_REQUEST).json("BAD REQUEST");
    })
    .catch(err => next(err));
};

module.exports.refreshToken = (req, res, next) => {
  console.log("refreshToken: controller");
  authService
    .refreshToken(req.user)
    .then(tokens =>
      tokens
        ? res.status(httpStatus.OK).json(tokens)
        : res
            .status(httpStatus.BAD_REQUEST)
            .json({ success: false, message: "Invalid token" })
    )
    .catch(err => next(err));
};

module.exports.activation = (req, res, next) => {
  authService
    .activation(req.id, req.role, req.query.email)
    .then(tokens =>
      tokens
        ? res.status(httpStatus.OK).json(tokens)
        : res
            .status(httpStatus.BAD_REQUEST)
            .json({ success: false, message: "Invalid token" })
    )
    .catch(err => next(err));
};

module.exports.getCurrent = (req, res, next) => {
  res.json(req.user);
};

module.exports.authSocialNetwork = (req, res, next) => {
  authService
    .authSocialNetwork(req.user)
    .then(tokens => res.status(httpStatus.OK).json(tokens))
    .catch(err => next(err));
};
