const Joi = require("joi");

const schemas = {
  reviewPOST: Joi.object().keys({
    ratting: Joi.number()
      .integer()
      .min(1)
      .max(5),
    reviewText: Joi.string()
      .required()
      .min(1),
    company: Joi.string()
      .required()
      .min(10)
  })
};

module.exports = schemas;
