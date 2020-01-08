var _ = require('lodash');
var mysql = require('mysql');
var config = require('../config');
var util = require('util');

var pool = mysql.createPool(_.merge({
	connectionLimit: 30,
}, config.mysql));

module.exports.getConnect = function() {
	return new Promise((res, rej) => {
		pool.getConnection((err, conn) => {
			if (err) return rej(err);

			res(conn);
		})
	});
}

module.exports.closeConnect = function(connect) {
	if (connect) {
		connect.release();
	}
}

module.exports.query = function(conn, sql) {
	return new Promise((res, rej) => {
		conn.query(sql, (err, data) => {
			if (err) {
				return rej(err)
			}

			res(data);
		});
	});
};
