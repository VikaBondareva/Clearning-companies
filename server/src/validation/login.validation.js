const Joi = require("joi");
const { Password } = require("../enums/validies.enum");

const schema = Joi.object().keys({
  identifier: Joi.string().required(),
  password: Joi.string()
    .regex(Password)
    .required()
});

module.exports = schema;
