const Order = require("../../models").order;
const Status = require("../../enums/status.enum");
const Company = require("../../models").company;
const Role = require("../../enums/roles.enum");
const {
  mailForChangeStatus,
  mailForCreateOrder
} = require("../../config/email");
const { pricingPrice, pricingTime } = require("../../config/pricingFunction");

async function createOrder(
  userID,
  {
    executor,
    service,
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
    "services.name": service
  });

  if (!company) throw "Not found service in company";

  const serviceCompany = company.services.find(serv => serv.name === service);
  const price = pricingPrice(
    company.rooms,
    countRooms,
    serviceCompany.coefficient
  );
  const cleanTime = pricingTime(
    company.rooms,
    countRooms,
    serviceCompany.coefficient
  );
  const order = new Order({
    customer: userID,
    executor,
    service,
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

    company.sendMailMessage(mailForCreateOrder(company.name, order._id));
  });
  return true;
}

async function getOrders({ _id, role }, { page, perPage, status, service }) {
  let selectCustomer = "name surname";
  if (role === Role.Executor) {
    selectCustomer = "name surname email phone";
  }
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    populate: [
      { path: "customer", select: selectCustomer },
      { path: "executor", select: "name email" }
    ],
    sort: "-created_at"
  };
  const query = {
    $or: [{ executor: _id }, { customer: _id }],
    status: status || {
      $all: [Status.Canceled, Status.Confirmed, Status.Pending, Status.Made]
    },
    service: service || { $regex: "" },
    isDeleted: false
  };
  const orders = await Order.paginate(query, options);
  return orders;
}

async function getByIdOrder(orderId, userId, role) {
  const selectCustomer = "name surname email phone";
  const selectExecutor = "name email";
  const order = await Order.findOne({
    $or: [
      { _id: orderId, customer: userId },
      { _id: orderId, executor: userId }
    ]
  })
    .populate("customer")
    .select(selectCustomer)
    .populate("executer")
    .select(selectExecutor)
    .exec();
  return order;
}

async function changeStatus(executor, orderId, { status, lockMessage = null }) {
  const order = await Order.findOne({ _id: orderId, executor })
    .populate("customer")
    .exec();
  console.log(order);
  console.log(status);
  if (!order) throw "Not found order";
  if (order.status === Status.Deleted) throw "Your order is deleted";
  if (order.status === Status.Pending) {
    if (status !== Status.Canceled && status !== Status.Confirmed)
      throw "Need canceled or confirmed";
  }

  if (order.status === Status.Canceled) throw "Canceled order";

  if (order.status === Status.Confirmed && status !== Status.Made)
    throw "Need made status order";

  order.status = status;
  if (status === Status.Canceled) {
    order.lockMessage = lockMessage;
  }
  // if(order.updated_at){
  //   delete order.updated_at;
  // }
  order.save((err, data) => {
    if (err) throw err;
    const { customer } = order;
    customer.sendMailMessage(
      mailForChangeStatus(order._id, status, lockMessage)
    );
  });
  return true;
}

async function deleteOrder(customer, orderId) {
  try {
    const order = await Order.findOne({ _id: orderId, customer })
      .populate("executor")
      .exec();
    if (order.status === Status.Deleted) return false;

    if (order.status === Status.Confirmed || order.status === Status.Made)
      return false;

    order.status = Status.Deleted;
    order.save((err, data) => {
      if (err) throw err;
      order.executor.sendMailMessage(mailForChangeStatus(order._id, "удален"));
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
