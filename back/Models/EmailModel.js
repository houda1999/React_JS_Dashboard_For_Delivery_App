const nodemailer = require("../node_modules/nodemailer");

exports.transporter =  nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: "beldi.ensas@gmail.com",
    pass:"mklzscwhqpxtykph"
  },
  
})

exports.getPasswordResetURL = getPasswordResetURL = (user, token) =>
  `http://localhost:3000/resetPassword/${user._id}/${token}`

exports.resetPasswordTemplate =  resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "Beldi Password Reset"
  const html = `
  <p>Hey ${user.displayName || user.email},</p>
  <p>We heard that you lost your password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Beldi.ma</p>
  `

  return { from, to, subject, html }
}