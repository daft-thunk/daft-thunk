const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created','Processing','Cancelled','Completed'),
    allowNull: false,
    defaultValue: 'Created',
  },
  dateOrdered: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  dateShipped: Sequelize.DATE,
  dateArrived: Sequelize.DATE
});

// instance method
Order.prototype.ship = () => {
  this.setDataValue('dateShipped', Date.now())
}

Order.prototype.arrive = () => {
  this.setDataValue('dateArrived', Date.now())
}

module.exports = Order;
