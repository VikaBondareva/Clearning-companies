var validate = require("mongoose-validator");

var emailValidator = [
  validate({
    validator: "isEmail",
    message: "Please fill a valid email address"
  })
];

const pnumberValidator = function(phoneNumber) {
  const re = /^(\+375|80)(29|25|44|33)\d{7}$/;
  return re.test(phoneNumber);
};

const passwordValidator = [
  validate({
    validator: "isLength",
    arguments: [6, 50],
    message: "Password should be between {ARGS[0]} and {ARGS[1]} characters"
  }),
  validate({
    validator: "matches",
    arguments: /\d/,
    message: "Password should contain numbers"
  }),
  validate({
    validator: "matches",
    arguments: /[a-zA-Z]/,
    message: "Password should contain letters"
  }),
  validate({
    validator: "matches",
    arguments: /[A-Z]/,
    message: "Password must contain one uppercase letter"
  })
];

var nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters"
  })
];

module.exports = {
  emailValidator,
  pnumberValidator,
  passwordValidator,
  nameValidator
};
