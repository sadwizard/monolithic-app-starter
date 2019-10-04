var mysql = require('mysql');
var config = require('../config');

var mysqlConnect = mysql.createConnection(config.mysql);

exports.default = mysqlConnect;
