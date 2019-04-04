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
  try {
    await nodemailer.createTestAccount((err, account) => {
      gmailTransport.sendMail(HelperOptions, (error, info) => {
        if (error) {
          throw new Error(`failed sent mail ${error.name}`);
        } else {
          console.log("sendEmail: " + email);
          console.log("Preview URL: " + info);
        }
      });
      gmailTransport.close();
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.sendGMail = async (email, { content, subject }) => {
  return await gmailSend(email, content, subject);
};
