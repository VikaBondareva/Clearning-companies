const httpStatus = require("http-status");
const { authenticateJwt } = require("../config/passport");

function permit(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    authenticateJwt(),
    // // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(httpStatus.FORBIDDEN).send("Forbidden");
      }
      // authentication and authorization successful
      next();
    }
  ];
}

module.exports = permit;
