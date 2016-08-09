var mysql = require('mysql');

function connectDB() {
  return mysql.createConnection('mysql://root:admin@localhost:3306/casadocodigo');
}
module.exports = function () {
  return connectDB;
};