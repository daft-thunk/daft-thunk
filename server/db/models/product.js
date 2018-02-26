const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.00
    }
  },
  description: Sequelize.TEXT,
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-product.png'
  },
  manufacturer: Sequelize.STRING,
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10
  }
});

// ASSOCIATIONS

module.exports = Product;