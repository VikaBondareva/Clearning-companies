const Order = require("../../models").order;
const Status = require("../../enums/status.enum");
const Company = require("../../models").company;
const Role = require("../../enums/roles.enum");
const emailService = require("../../services/email.service");
const {
  mailForChangeStatus,
  mailForCreateOrder
} = require("../../config/email");
const { pricingPrice, pricingTime } = require("../../config/pricingFunction");

async function createOrder(
  userID,
  {
    executor,
    services,
    address,
    date,
    days,
    regularity,
    duration,
    startTime,
    countRooms
  }
) {
  const company = await Company.findOne({
    _id: executor,
    "services.name": { $in: services }
  });

  if (!company) throw "Not found service in company";

  console.log(company);
  let price = 0,
    cleanTime = 0;
  for (let serviceId of services) {
    const service = company.services.find(serv => serv.name === serviceId);
    price += pricingPrice(company.rooms, countRooms, service.coefficient);
    cleanTime += pricingTime(company.rooms, countRooms, service.coefficient);
  }
  const order = new Order({
    customer: userID,
    executor,
    services,
    address,
    days,
    regularity,
    duration,
    date,
    countRooms,
    startTime,
    price,
    cleanTime,
    status: Status.Pending
  });
  await order.save((err, data) => {
    if (err) throw err;

    emailService.sendGMail(
      company.email,
      mailForCreateOrder(company.name, order._id)
    );
  });
  return true;
}

async function getOrders({ _id, role }, { page, perPage, status, services }) {
  let selectCustomer = "name surname";
  if (role === Role.Executor) {
    selectCustomer = "name surname email phone";
  }
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    populate: [
      { path: "customer", select: selectCustomer },
      { path: "company", select: "name email" }
    ],
    sort: "-created_at"
  };
  const query = {
    $or: [{ executor: _id }, { customer: _id }],
    status: status || { $regex: "" },
    services: services || { $regex: "" }
  };
  const orders = await Order.paginate(query, options);
  return orders;
}

async function getByIdOrder(orderId, userId) {
  const order = await Order.find({
    $or: [
      { _id: orderId, customer: userId },
      { _id: orderId, executor: userId }
    ]
  });
  return order;
}

async function changeStatus(executor, orderId, { status }) {
  const order = await Order.findOne({ _id: orderId, executor })
    .populate("customer")
    .exec();
  console.log(order);
  console.log(status);
  if (!order) throw "Not found order";
  if (order.status === Status.Pending) {
    if (status !== Status.Canceled && status !== Status.Confirmed)
      throw "Need canceled or confirmed";
  }

  if (order.status === Status.Canceled) throw "Canceled order";

  if (order.status === Status.Confirmed && status !== Status.Made)
    throw "Need made status order";

  order.status = status;
  order.save((err, data) => {
    if (err) throw err;

    const { customer } = order;
    if (customer.isNotify && customer.email) {
      emailService.sendGMail(
        order.customer.email,
        mailForChangeStatus(order._id, status)
      );
    }
  });
  return true;
}

async function deleteOrder(customer, orderId) {
  try {
    const order = await Order.findOne({ _id: orderId, customer })
      .populate("executor")
      .exec();
    if (order.isDeleted) return false;

    if (order.status === Status.Confirmed || order.status === Status.Made)
      return false;

    order.isDeleted = true;
    order.save((err, data) => {
      if (err) throw err;
      emailService.sendGMail(
        order.executor.email,
        mailForChangeStatus(order._id, "удален")
      );
    });
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createOrder,
  getOrders,
  getByIdOrder,
  changeStatus,
  deleteOrder
};
