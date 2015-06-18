var fs = require("fs");
var express = require('express');
var app = express();

app.set('public', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

var port = process.env.PORT || 1337;

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

