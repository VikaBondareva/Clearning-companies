const Joi = require("joi");
const { Password } = require("../enums/validies.enum");
const serviceTypes = require("../enums/serviceTypes.enum");

const schemas = {
  companyPOST: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    description: Joi.string()
      .required()
      .min(50)
      .max(500),
    address: Joi.object({
      country: Joi.string().required(),
      city: Joi.string().required(),
      other: Joi.string().required()
    }).required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .regex(Password),
    rooms: Joi.object({
      toilet: Joi.object({
        price: Joi.number()
          .required()
          .default(0),
        time: Joi.when("price", {
          is: Joi.number() > 0,
          then: Joi.number().required(),
          otherwise: Joi.number()
            .required()
            .default(0)
        })
      }),
      standart: Joi.object({
        price: Joi.number()
          .required()
          .default(0),
        time: Joi.when("price", {
          is: Joi.number() > 0,
          then: Joi.number().required(),
          otherwise: Joi.number()
            .required()
            .default(0)
        })
      }),
      big: Joi.object({
        price: Joi.number()
          .required()
          .default(0),
        time: Joi.when("price", {
          is: Joi.number() > 0,
          then: Joi.number().required(),
          otherwise: Joi.number()
            .required()
            .default(0)
        })
      })
    }).required(),
    services: Joi.array()
      .items(
        Joi.object({
          name: Joi.string()
            .required()
            .allow(serviceTypes),
          coefficient: Joi.number().required()
        })
      )
      .required()
  }),
  companyQUERY: {
    page: Joi.number(),
    perPage: Joi.number(),
    city: Joi.string(),
    maxPrice: Joi.number(),
    minPrice: Joi.number(),
    name: Joi.string(),
    sort: Joi.string(),
    services: Joi.allow(Joi.string(), Joi.array().items(Joi.string())),
    day: Joi.number(),
    start: Joi.string()
  }
};

module.exports = schemas;
