//import the require middelWares
const nodemailer = require("nodemailer");

//create sendEmail function
exports.sendEmail = async (options) => {
  //Here create the Transporter
  var transporter = nodemailer.createTransport({
    host: "outlook.live.com",

    auth: {
      user: "alim46972@outlook.com",
      pass: "M123456789M",
    },
  });

  //Then create the Massege
  const message = {
    from: `alim46972@outlook.com `,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};
