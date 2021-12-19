const Sequilize = require('sequelize');

const sequilize = require('../util/database');

const Order = sequilize.define('order',{
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequilize.INTEGER,
    autoIncrement: true
  }
});

module.exports = Order;