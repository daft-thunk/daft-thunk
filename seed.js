const _ = require('lodash');
const faker = require('faker');
faker.seed(199);

const { Product, Category, User } = require('./server/db/models');
const db = require('./server/db/db');
const Promise = require('bluebird');

function generateProducts() {

  const products = _.times(25, () =>
    Product.build({
      name: faker.hacker.noun(),
      price: (Math.random() * 1000).toFixed(2),
      description: faker.lorem.paragraph(4),
      manufacturer: faker.company.companyName(),
      stock: Math.floor(Math.random() * Math.floor(20))
  })
  );
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

function generateUsers() {
  const users = _.times(5, () =>
    User.build({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.company.bsBuzz() + faker.address.country(),
      passwordUpdateDate: faker.date.recent(100),
      mailingAddress: `${faker.address.streetAddress()}\n${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`
    })
  )
  return users;
}

function createProducts () {
  return Promise.map(generateProducts(), product => product.save());
}

function createCategories () {
  return Promise.map(generateCategories(), category => category.save());
}

function createUsers () {
  return Promise.map(generateUsers(), user => user.save());
}

  async function seed() {
    await db.sync({force: true});

    console.log('Seeding Products');
    await createProducts();

    console.log('Seeding Categories');
    await createCategories();

    console.log('Seeding Users');
    await createUsers();

    const cat1 = await Category.findOne({where: {name: 'Guitar'}});
    const cat2 = await Category.findOne({where: {name: 'Drum'}});
    const cat3 = await Category.findOne({where: {name: 'Bass'}});

    const guitar1 = await Product.findById(10);
    const guitar2 = await Product.findById(11);
    const guitar3 = await Product.findById(12);

    const drum1 = await Product.findById(8);
    const bass1 = await Product.findById(9);

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
