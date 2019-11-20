const Joi = require("joi");
const { Time, DateOrder } = require("../enums/validies.enum");
const Status = require("../enums/status.enum");
const daysWeek = require("../enums/daysWeek.enum");
const serviceTypes = require("../enums/serviceTypes.enum");

const schemas = {
  orderPOST: Joi.object().keys({
    executor: Joi.string().required(),
    address: Joi.string().required(),
    regularity: Joi.number()
      .required()
      .min(1)
      .max(4),
    duration: Joi.when("regularity", {
      is: Joi.number() > 1,
      then: Joi.number()
        .required()
        .min(1)
        .max(6)
    }),
    days: Joi.array()
      .required()
      .items(
        Joi.string()
          .required()
          .allow(daysWeek)
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
    date: Joi.string()
      .regex(DateOrder)
      .required(),
    service: Joi.string().required()
  }),
  orderQUERY: {
    status: Joi.string().valid([
      Status.Canceled,
      Status.Confirmed,
      Status.Made,
      Status.Pending
    ]),
    page: Joi.number(),
    perPage: Joi.number(),
    service: Joi.string()
  },
  orderPUT: {
    status: Joi.string().valid([
      Status.Canceled,
      Status.Confirmed,
      Status.Made,
      Status.Pending
    ]),
    lockMessage: Joi.when("status", {
      is: Status.Canceled,
      then: Joi.string()
        .required()
        .min(10)
    })
  }
};

module.exports = schemas;
