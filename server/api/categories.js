const router = require('express').Router();
const { Category } = require('../db/models');
module.exports = router;

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(console.error);
});

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(console.error);
});
