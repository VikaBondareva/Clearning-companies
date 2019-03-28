var MailConfig = require("../config/email");
var gmailTransport = MailConfig.GmailTransport;

const gmailSend = (email, content, subject) => {
  let HelperOptions = {
    from: `Онлайн система заказов уборки mega.clean12@mail.ru`,
    to: email,
    subject,
    text: content
  };
  try {
    gmailTransport.sendMail(HelperOptions, (error, info) => {
      if (error) {
        throw new Error(`failed sent mail ${error.name}`);
      } else {
        console.log("sendEmail: " + email);
      }
    });
    gmailTransport.close();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.sendGMail = (email, { content, subject }) => {
  gmailSend(email, content, subject);
};
