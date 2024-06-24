const nodemailer = require("nodemailer");
const { forgetPasswordTemplet } = require("./template/otpTemplets");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.forgotPasswordSendMail = async ({ to, action_url }) => {
  const info = await transporter.sendMail({
    from: '"Ecommerce " <vavaliyavinay@gmail.com>',
    to: to,
    subject: "Reset Password for E-commerce",
    text: "Hello world?",
    html: await forgetPasswordTemplet(to, action_url),
  });
  return info;
};
