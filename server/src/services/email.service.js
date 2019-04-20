const nodemailer = require("nodemailer");
const config = require("../config/environment");

const gmailSend = async (email, content, subject) => {
  const EmailTransport = nodemailer.createTransport({
    host: config.gmailServer.host,
    port: config.emailPort,
    secure: false,
    auth: {
      user: config.gmailUser.email,
      pass: config.gmailUser.password
    }
  });

  EmailTransport.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take messages");
    }
  });

  let HelperOptions = {
    from: `Клининговые компании mega.clean12@mail.ru`,
    to: email,
    subject,
    html: content
  };
  try {
    let info = await EmailTransport.sendMail(HelperOptions);
    console.log("sendEmail: " + email);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.sendGMail = async (email, { content, subject }) => {
  return await gmailSend(email, content, subject);
};
