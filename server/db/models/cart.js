const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  total: {
    type: Sequelize.FLOAT(10, 2),
    get() {return this.getTotal().bind(this);}
  }
});

Cart.prototype.getTotal = function() {
  function totalReducer(acc, curProduct) {
    let price = curProduct.price * curProduct.cart_to_product.quantity;
    return acc + price;
  }

  let total = this.products !== undefined ? this.props.cart.products.reduce(totalReducer, 0) : 0;
  return total;
};

module.exports = Cart;
