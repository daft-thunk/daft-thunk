const router = require('express').Router();
const { Review } = require('../db/models');
module.exports = router;

// router.get('/', (req, res, next) => {
//   Review.findAll({
//     include: [Cart, { model: User, attributes: ['id', 'firstName', 'lastName'] }]
//   })
//     .then(orders => res.json(orders))
//     .catch(next);
// });

// router.get('/:orderId', (req, res, next) => {
//   Review.findById(+req.params.orderId)
//     .then(order => res.json(order))
//     .catch(next);
// });

router.post('/', (req, res, next) => {
  const { userId, productId, review, rating } = req.body;
  Review.create({ userId, productId, rating, text: review })
    .then(createdReview => res.status(201).json(createdReview))
    .catch(next);
});
