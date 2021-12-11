const Sequilize = require('sequelize');

const sequilize = require('../util/database');

const Cart = sequilize.define('cart',{
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequilize.INTEGER,
    autoIncrement: true
  }
});

module.exports = Cart;