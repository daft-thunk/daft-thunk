const { Product, Category } = require('./server/db/models');
const db = require('./server/db/db');
const Promise = require('bluebird');

function generateProducts() {
  const products = [
    Product.build({
      name: 'guitar 1',
      price: 240.55,
      description: 'A really average guitar',
      manufacturer: 'Gibson',
      stock: 6
    }),
    Product.build({
      name: 'guitar 2',
      price: 3000.95,
      description: 'A really nice guitar',
      manufacturer: 'Fender',
      stock: 2
    }),
    Product.build({
      name: 'guitar 3',
      price: 12.75,
      description: 'A really crappy guitar',
      manufacturer: 'Bergal',
      stock: 56
    }),
    Product.build({
      name: 'bass 1',
      price: 200.55,
      description: 'A really average bass guitar',
      manufacturer: 'Gibson',
      stock: 9
    }),
    Product.build({
      name: 'drum 1',
      price: 100.55,
      description: 'A solid drum',
      manufacturer: 'Pearl',
      stock: 15
    })
  ];
  return products;
}

function generateCategories() {
  const categories = [
    Category.build(
      {name: 'Guitar'}
    ),
    Category.build(
      {name: 'Drum'}
    ),
    Category.build(
      {name: 'Bass'}
    )
  ];
  return categories;
}

function createProducts () {
  return Promise.map(generateProducts(), product => product.save());
}

function createCategories () {
  return Promise.map(generateCategories(), category => category.save());
}

// function setProductCategories () {

// }


  async function seed() {
    await db.sync({force: true});

    console.log('Seeding Products');
    await createProducts();

    console.log('Seeding Categories');
    await createCategories();

    const cat1 = await Category.findOne({where: {name: 'Guitar'}});
    const cat2 = await Category.findOne({where: {name: 'Drum'}});
    const cat3 = await Category.findOne({where: {name: 'Bass'}});
    // console.log(cat1.get())
    const guitar1 = await Product.findOne({where: {name: 'guitar 1'}});
    const guitar2 = await Product.findOne({where: {name: 'guitar 2'}});
    const guitar3 = await Product.findOne({where: {name: 'guitar 3'}});

    const drum1 = await Product.findOne({where: {name: 'drum 1'}});
    const bass1 = await Product.findOne({where: {name: 'bass 1'}});

    await cat1.addProducts([guitar1, guitar2, guitar3]);

    await cat2.addProduct(drum1);
    await cat3.addProduct(bass1);

  }

  seed()
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .then(() => console.log('Seeding successful'))
  .then(() => {
    db.close();
    return null;
  });
