var _ = require('lodash');
var mysql = require('mysql');
var config = require('../config');
var util = require('util');
var { getConnect, closeConnect, query } = require('/db/mysqlPool');

class Database {
	constructor() {
		this.connect = null;
	}

	query(sql) {
		return new Promise((res, rej) => {
			if (!this.connect) {
				getConnect().then(conn => {
					this.connect = conn; 
					query(conn, sql).then(res).catch(rej);
				}).catch(rej);
				return;
			}

			query(this.connect, sql).then(res).catch(rej);
		});
	}

	closeConnect() {
		closeConnect(this.connect);
		this.connect = null;
	}
}

module.exports = Database;