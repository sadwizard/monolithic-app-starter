require('sexy-require');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('/db/mysqlConnect').default;
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var path = require('path');
var mysqlPool = require('/db/mysqlPool');

var app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Api-bearer");
    res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', require('./controllers/auth'));
app.use('/user', require('./controllers/user'));
app.use('/specialize', require('./controllers/specialization'));
 
app.listen(3000, () => console.log('Server starting on localhost:3000'));
