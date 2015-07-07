var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');
var MANDRILL_API_KEY = 'ze2Lcwew5KrZkSNCrfUQcw';

// object that is able to send mail
// You can use the same transporter object for all e-mails (no need to recreate)
var transport = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: MANDRILL_API_KEY
  }
}));

var sendEmail = function(mailObject, cb){
    transport.sendMail({
        from: 'showjunkie@gmail.com',
        to: mailObject.to,
        subject: mailObject.subject,
        html: mailObject.html
    }, function(err, info) {
      if (err) {
        console.error(err);
      } else {
        cb(info);
      }
    });
};

module.exports = sendEmail;