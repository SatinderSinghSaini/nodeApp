const Sequilize = require('sequelize');

const sequilize = require('../util/database');

const CartItem = sequilize.define('cartItem',{
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequilize.INTEGER,
    autoIncrement: true
  },
  quantity: Sequilize.INTEGER
});

module.exports = CartItem;