const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  productId: Sequelize.INTEGER,
  rating: {
    type: Sequelize.INTEGER,
    min: 1,
    max: 5,
    allowNull: false
  },
  text: Sequelize.TEXT
});

// ASSOCIATIONS - USER

module.exports = Review;
