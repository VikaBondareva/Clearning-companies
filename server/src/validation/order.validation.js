const Joi = require("joi");
const { Time } = require("../enums/validies.enum");
const Status = require("../enums/status.enum");

const schemas = {
  orderPOST: Joi.object().keys({
    executor: Joi.string().required(),
    address: Joi.string().required(),
    recurrent: Joi.bool().required(),
    days: Joi.array()
      .required()
      .items(
        Joi.string()
          .required()
          .allow(["пн", "вт", "ср", "чт", "пт", "сб", "вс"])
      )
      .required(),
    countRooms: Joi.object({
      toilet: Joi.number()
        .required()
        .default(0),
      standart: Joi.number()
        .required()
        .default(0),
      big: Joi.number()
        .required()
        .default(0)
    }).required(),
    startTime: Joi.string()
      .regex(Time)
      .required(),
    services: Joi.array()
      .items(Joi.string().required())
      .required()
  }),
  orderQUERY: {
    status: Joi.string().valid([
      Status.Canceled,
      Status.Confirmed,
      Status.Made,
      Status.Pending
    ]),
    page: Joi.number(),
    perPage: Joi.number()
  }
};

module.exports = schemas;
