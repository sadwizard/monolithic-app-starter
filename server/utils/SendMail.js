var nodemailer = require("nodemailer");

exports.default = function(params, callback) {
  const { to, subject, msg, html } = params;

  if (!to || !callback || !subject) {
    return callback(new Error('Invalid params to send mail'));
  }

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'sadwizard1@yandex.ru', // generated ethereal user
      pass: 'qwclogkmbmswjeqm' // generated ethereal password
    }
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: 'sadwizard1@yandex.ru', // sende
    to: to,
    subject: subject || '',
    text: msg || '',
    html: html || ''
  }, callback);
}
