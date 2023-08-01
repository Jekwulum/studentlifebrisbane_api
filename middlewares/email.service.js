const config = process.env;
const nodemailer = require("nodemailer");

const sendMailService = (message, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: config.EMAIL_USERNAME,
      pass: config.EMAIL_PASSWORD
    }
  });

  const options = {
    from: config.EMAIL_FROM,
    to: config.EMAIL_FROM,
    subject: "Contact Us - studentlifebrisbane",
    html: message
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "FAILED", message: error.message });
    }
    else {
      console.log(info);
      res.status(200).json({ status: "SUCCESS", message: "Message succesfully sent" });
    }
  })

};

module.exports = sendMailService;