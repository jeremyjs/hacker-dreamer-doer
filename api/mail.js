var router      = require('express').Router();
var nodemailer  = require('nodemailer');
var secrets     = require('../secrets');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: secrets.google
});

router.get('/', function (req, res, next) {
  res.send({
    '/send': 'sends an email with the name, email, and message provided in the post body'
  })
});

router.post('/send', function (req, res, next) {
  var body = req.body;
  if(!body.name) return res.send({ responseCode: 400, message: 'Name required.', success: false });
  if(!body.email) return res.send({ responseCode: 400, message: 'Email required.', success: false });
  if(!body.message) return res.send({ responseCode: 400, message: 'Message required.', success: false });
  transporter.sendMail({
    from: body.name + '<' + body.email + '>',
    to: 'jjman505@gmail.com',
    subject: 'New message from Hacker, Dreamer, Doer',
    text: body.message
  }, function error (err, info){
    if(err) {
      var message = 'Error sending email: ' + err;
      console.log(message);
      res.send({ responseCode: 500, message: message, success: false });
    }
    else {
      res.send({ responseCode: 200, message: 'success', success: true });
    }
  });
});

module.exports = router;
