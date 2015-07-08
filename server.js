var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('public', __dirname + '/public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api', require('./api/index'));

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

var port = process.env.PORT || 1337;

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

