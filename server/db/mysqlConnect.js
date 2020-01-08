var mysql = require('mysql');
var config = require('../config');

var mysqlConnect = mysql.createConnection(config.mysql);

exports.default = {
  db: mysqlConnect,
  getDbQueryFunction: function(response) {
    return (sql) => new Promise((res, rej) => {
        mysqlConnect.query(sql, (error, data) => {
            if (error) {
                return response.status(500).json({ message: 'Ошибка сервера' });
            }

            res(data);
        });
    });
  }
};
