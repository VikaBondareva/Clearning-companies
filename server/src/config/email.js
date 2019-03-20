let nodemailer = require("nodemailer");
const config = require("../config/environment");

module.exports.GmailTransport = nodemailer.createTransport({
  host: "webmail.stevex.me",
  port: 465,
  tls: { rejectUnauthorized: false },
  auth: {
    user: "amel@stevex.me",
    pass: "test123"
  }
  // host: config.gmailServer.host,
  // port: config.emailPort,
  // tls: { rejectUnauthorized: false },
  // auth: {
  //     user:  config.gmailUser.email,
  //     pass: config.gmailUser.password
  // }
});

module.exports.mailForVerified = ({ name, email }, token) => {
  const content = `Уважаемый, ${name}. Для подтверждения регистации пройтите по ссылке:\n
    http://localhost:${
      process.env.PORT
    }/api/auth/activation?token=${token}&email=${email}`;
  const subject = "Подтверждение регистрации";
  return { content, subject };
};

module.exports.mailVerifiedEmail = (name, email, token) => {
  const content = `Уважаемый, ${name}. Для подтверждения почты пройтите по ссылке:\n
    http://localhost:${
      process.env.PORT
    }/api/auth/activation?token=${token}&email=${email}`;
  const subject = "Подтверждение почты";
  return { content, subject };
};

module.exports.mailForChangeStatus = (orderId, status) => {
  const content = `Ваш заказ ${status} \nПерейдите по ссылке, чтобы посмотреть
    http://localhost:${process.env.PORT}/api/orders/${orderId}`;
  const subject = `Ваш заказ ${status}`;
  return { content, subject };
};

module.exports.mailForUnblocked = name => {
  const content = `${name}, Ваш профиль разблокировали`;
  const subject = `Ваш профиль разблокирован`;
  return { content, subject };
};

module.exports.mailForBlocked = (name, message) => {
  const content = `${name}, Ваш профиль заблокировали по следующей причине: ${message}`;
  const subject = `Ваш профиль заблокировали`;
  return { content, subject };
};
