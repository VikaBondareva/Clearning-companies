const config = require("../config/environment");
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.query.token;
  if (token) {
    jwt.verify(token, config.jwt.secret, (err, data) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        console.log(`checkToken ${data.id}`);
        req.id = data.id;
        req.role = data.role;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  checkToken
};
