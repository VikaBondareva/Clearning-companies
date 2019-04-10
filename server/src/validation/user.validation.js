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
    // addresses: Joi.array().items(
    //   Joi.object({
    //     country: Joi.string().required(),
    //     city: Joi.string().required(),
    //     district: Joi.string(),
    //     street: Joi.string().required(),
    //     house: Joi.number().required(),
    //     apartment: Joi.number()
    //   })
    // ),
    email: Joi.string().email(),
    phone: Joi.when("email", {
      is: null,
      then: Joi.string()
        .trim()
        .regex(PhoneNumber)
        .required()
    }),
    password: Joi.when("email" || "phone", {
      is: Joi.string(),
      then: Joi.string()
        .required()
        .regex(Password)
    }),
    isNotify: Joi.boolean().default(true)
  })
};

module.exports = schemas;
