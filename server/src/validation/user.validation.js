const Joi = require("joi");
const { PhoneNumber, Password } = require("../enums/validies.enum");

const schemas = {
  userPOST: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    surname: Joi.string()
      .required()
      .min(3)
      .max(50),
    address: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string()
      .trim()
      .regex(PhoneNumber),
    password: Joi.string()
      .required()
      .regex(Password),
    isNotify: Joi.boolean().default(true)
  })
};

module.exports = schemas;
