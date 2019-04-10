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
  const content = `Уважаемый, ${name}. Для подтверждения регистации пройдите по ссылке:\n
  ${process.env.CLIENT_URL}/activation?token=${token}&email=${email}`;
  const subject = "Подтверждение регистрации";
  return { content, subject };
};

module.exports.mailVerifiedEmail = (name, email, token) => {
  const content = `Уважаемый, ${name}. Для подтверждения почты пройтите по ссылке:\n
    ${process.env.CLIENT_URL}/activation?token=${token}&email=${email}`;
  const subject = "Подтверждение почты";
  return { content, subject };
};

module.exports.mailForChangeStatus = (orderId, status) => {
  const content = `Ваш заказ ${status} \nПерейдите по ссылке, чтобы посмотреть
  ${process.env.CLIENT_URL}/profile/orders/?status=${status}`;
  const subject = `Ваш заказ ${status}`;
  return { content, subject };
};

module.exports.mailForUnblocked = name => {
  const content = `${name}, Ваш профиль разблокировали\n Перейдите по ссылке, чтобы посмотреть
  ${process.env.CLIENT_URL}/profile`;
  const subject = `Ваш профиль разблокирован`;
  return { content, subject };
};

module.exports.mailForBlocked = (name, message) => {
  const content = `${name}, Ваш профиль заблокировали по следующей причине: ${message}`;
  const subject = `Ваш профиль заблокировали`;
  return { content, subject };
};

module.exports.mailForCreateOrder = (name, orderId) => {
  const content = `${name}, У вас новый заказ. Перейтиде по ссылке что бы посмотреть:  ${
    process.env.CLIENT_URL
  }/profile/orders?status=pending`;
  const subject = `Новый заказ`;
  return { content, subject };
};
