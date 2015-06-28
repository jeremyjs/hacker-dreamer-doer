var fs = require('fs');
var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var secrets = require('./secrets');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: secrets.google
});

app.set('public', __dirname + '/public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.post('/api/mail/send', function (req, res) {
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

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

var port = process.env.PORT || 1337;

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

