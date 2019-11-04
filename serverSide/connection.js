const sql = require('mysql');
require('dotenv').config();

const connection = sql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
}); 


module.exports = connection;
