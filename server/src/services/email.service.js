var MailConfig = require("../config/email");
var gmailTransport = MailConfig.GmailTransport;
const nodemailer = require("nodemailer");

const gmailSend = async (email, content, subject) => {
  let HelperOptions = {
    from: `Онлайн система заказов уборки mega.clean12@mail.ru`,
    to: email,
    subject,
    text: content
  };
  await nodemailer.createTestAccount((err, account) => {
    gmailTransport.sendMail(HelperOptions, (error, info) => {
      if (error) {
        throw new Error(`failed sent mail ${error}`);
      } else {
        console.log("sendEmail: " + email);
        console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
        return "success";
      }
    });
    gmailTransport.close();
  });
};

module.exports.sendGMail = async (email, { content, subject }) => {
  return await gmailSend(email, content, subject);
};
