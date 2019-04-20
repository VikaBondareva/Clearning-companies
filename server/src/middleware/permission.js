const httpStatus = require("http-status");
const { authenticateJwt } = require("../config/passport");

function permit(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    authenticateJwt(),
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(httpStatus.FORBIDDEN).send("Forbidden");
      }
      next();
    }
  ];
}

module.exports = permit;
