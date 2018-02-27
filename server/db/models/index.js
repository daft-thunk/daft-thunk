const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');
const Cart = require('./cart');
const Cart_To_Product = require('./cart_to_product');

/**
 * ASSOCIATIONS
 */

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

Cart.belongsToMany(Product, {through: Cart_To_Product});
Product.belongsToMany(Cart, {through: Cart_To_Product});

Order.hasOne(Cart);

/**
 * Model exports below.
 * USAGE: const {User} = require('../db/models')
 */

module.exports = {
  User,
  Product,
  Order,
  Review,
  Cart,
  Cart_To_Product
};
