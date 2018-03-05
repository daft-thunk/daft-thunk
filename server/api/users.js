const router = require('express').Router();
const {User, Product} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/:id/cart', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.getCart({include: [Product]}))
    .then(cart => {
      res.json(cart);
    })
    .catch(next);
});

router.put('/:id/cart', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.setCart(req.body.cartId))
    .then(() => res.sendStatus(201))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update({role: req.body.role}))
    .then(() => res.sendStatus(201))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
