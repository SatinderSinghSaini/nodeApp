const Sequilize = require('sequelize');

const sequilize = require('../util/database');

const OrderItem = sequilize.define('orderItem',{
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequilize.INTEGER,
    autoIncrement: true
  },
  quantity: Sequilize.INTEGER
});

module.exports = OrderItem;