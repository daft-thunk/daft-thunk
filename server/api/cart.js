const router = require('express').Router();
const { Cart, Cart_To_Product, Product } = require('../db/models');
module.exports = router;

// get cart by id
router.get('/:id', (req, res, next) => {
  Cart.findById(req.params.id, {include: [Product]})
    .then(cart => res.json(cart))
    .catch(next);
});

// create cart
router.post('/', (req, res, next) => {
  Cart.create({})
    .then(cart => {
      res.json(cart);
    });
});

// add row to cart_to_product (AKA add product to cart)
router.post('/:id', (req, res, next) => {
  Cart.findById(req.params.id)
  .then(cart => cart.addProduct(req.body.productId))
  .then(() => res.sendStatus(201))
  .catch(next);
});

// edit quantity of product in the cart
router.put('/:id', (req, res, next) => {
  Cart_To_Product.findOne({
    where: {cartId: req.params.id, productId: req.body.productId}
  })
  .then(cToP => cToP.update({quantity: req.body.quantity}))
  .then(() => res.sendStatus(201))
  .catch(next);
});

// delete product from the cart
router.delete('/:id', (req, res, next) => {
  Cart_To_Product.findOne({
    where: {cartId: req.params.id, productId: req.body.productId}
  })
  .then(cToP => cToP.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
});
