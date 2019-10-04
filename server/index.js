var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('./db/mysqlConnect').default;
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path');

var controller = require('./controllers/comments');

global.dbConnect = mysql.connect(function(err) {
  if (err) throw err;

  console.log('database connect');
});



var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, DELETE");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/comments', controller);
 
app.listen(3000, function() {console.log('Server starting localhost:3000')});
