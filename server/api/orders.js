const router = require('express').Router();
const { Order, Cart, User } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [Cart, { model: User, attributes: ['id', 'firstName', 'lastName'] }]
  })
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  Order.findById(+req.params.orderId)
    .then(order => res.json(order))
    .catch(next);
});

router.get('/by/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.getOrders())
    .then(orders => res.json(orders))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next);
});

router.put('/:orderId', (req, res, next) => {
  Order.findById(+req.params.orderId)
    .then(orderInstance => {
      return orderInstance.update({status: req.body.status});
    })
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next);
});
