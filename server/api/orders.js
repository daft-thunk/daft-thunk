const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  Order.findById(+req.params.orderId)
    .then(order => res.json(order))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => res.status(201).json(order))
  .catch(next);
});
