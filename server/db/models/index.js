const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');
const Cart = require('./cart');
const Cart_To_Product = require('./cart_to_product');
const Category = require('./category');

/**
 * ASSOCIATIONS
 */

// Review.hasOne(User);
User.hasMany(Review);
User.hasMany(Order);
Review.belongsTo(User);

// Review.hasOne(Product);
Product.hasMany(Review);

Product.belongsToMany(Category, {through: 'product_to_category'});
Category.belongsToMany(Product, {through: 'product_to_category'});

Cart.belongsToMany(Product, {through: Cart_To_Product});
Product.belongsToMany(Cart, {through: Cart_To_Product});

Order.belongsTo(Cart);
Order.belongsTo(User);

User.hasOne(Cart);


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
  Cart_To_Product,
  Category
};
