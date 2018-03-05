const router = require('express').Router();
const {User, Product} = require('../db/models');
module.exports = router;

// this should be moved to an admin route
const adminCheck = req => {
  if (req.user && req.user.role === 'admin') return true;
  return false;
};

router.get('/', (req, res, next) => {
  if (!adminCheck(req)) {
    res.status(403).send('<h1>FORBIDDEN</h1>');
  } else {
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'role']
    })
    .then(users => res.json(users))
    .catch(next);
  }
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
    .then(foundUser => foundUser.update({role: req.body.role}))
    .then(updatedUser => res.json(updatedUser))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
