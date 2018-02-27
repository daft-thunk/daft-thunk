const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');

/**
 * ASSOCIATIONS
 */

Review.belongsTo(User);

/**
 * Model exports below.
 * USAGE: const {User} = require('../db/models')
 */

module.exports = {
  User,
  Product,
  Order,
  Review
};
