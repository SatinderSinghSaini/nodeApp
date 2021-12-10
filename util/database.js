const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'MySql@123_321', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
