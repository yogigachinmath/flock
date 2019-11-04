const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: process.env.max,
    min: process.env.min,
    acquire: process.env.acquire,
    idle: process.env.idle
  }
});
 
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.files = require('./models/file.model.js')(sequelize, Sequelize);
 
module.exports = db;