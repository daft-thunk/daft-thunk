const router = require('express').Router();
const { Product, Review, User, Category } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll({
    include: [
      {
        model: Review,
        include: [User]
      },
      { model: Category }
    ]
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(+req.params.productId, {
    include: [
      {
        model: Review,
        include: [User]
      }
    ],
    order: [
      [{model: Review}, 'createdAt', 'DESC']
    ]
  })
    .then(product => res.json(product))
    .catch(next);
});

// create new product - admin only
// router.post('/', (req, res, next) => {
//   Product.build(//req.body.properties)
//     .then(//get categories from req.body)
//     .then(product => res.json(product))
//     .catch(next);
// });

// delete product - admin only
router.delete('/:productId', (req, res, next) => {
  Product.findById(+req.params.productId)
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});
