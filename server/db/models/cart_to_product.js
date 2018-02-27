const Sequelize = require('sequelize');
const db = require('../db');

const Cart_To_Product = db.define('cart_to_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

module.exports = Cart_To_Product;
