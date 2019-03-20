const Joi = require("joi");
const { PhoneNumber, Password } = require("../enums/validies.enum");

const schema = Joi.object().keys({
  email: Joi.string().email(),
  phone: Joi.string()
    .trim()
    .regex(PhoneNumber),
  password: Joi.string()
    .regex(Password)
    .required()
});

module.exports = schema;
