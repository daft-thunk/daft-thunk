const User = require('./user')
// const Order = require('./order')
const Product = require('./product')
const Cart = require('./cart')
const Cart_To_Product = require('./cart_to_product')

/**
 * ASSOCIATIONS
 */

Review.belongsTo(User);
User.hasMany(Review);

/**
 * Model exports below.
 * USAGE: const {User} = require('../db/models')
 */

module.exports = {
  User,
  Product,
  Order,
  Cart,
  Cart_To_Product
};
