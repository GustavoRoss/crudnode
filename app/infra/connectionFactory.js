var mysql = require('mysql');

function connectDB() {
	if (!process.env.NODE_ENV) {
		return mysql.createConnection('mysql://root:admin@localhost:3306/casadocodigo');
	}
	if(process.env.NODE_ENV=='test'){
		return mysql.createConnection('mysql://root:admin@localhost:3306/casadocodigo_test');
	}
}
module.exports = function () {
	return connectDB;
};

