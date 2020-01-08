// # migrations.js
const mysql = require('mysql');
const migration = require('mysql-migrations');
const config = require('./config');
// const exec = require('child_process').exec;
// const fs = require("fs");

const connection = mysql.createPool(Object.assign({}, { connectionLimit : 10 }, config.mysql));
const migrationsDir = '/migrations';

// if (!fs.existsSync(__dirname + migrationsDir)) {
//     fs.mkdirSync(migrationsDir);
// }

migration.init(connection, __dirname + migrationsDir);

// function saveDumpBg() {
// 	exec();
// }