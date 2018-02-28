const _ = require('lodash');
const faker = require('faker');
faker.seed(199);

const {
  Product,
  Category,
  User,
  Review,
  Order
} = require('./server/db/models');
const db = require('./server/db/db');
const Promise = require('bluebird');

// this will be used throughout the database
const testUserData = {
  firstName: 'zeke',
  lastName: 'test',
  email: 'zeke@zeke.zeke',
  password: '123',
  passwordUpdateDate: '2018-01-15 00:56:24.038-06',
  mailingAddress: '123 Test\nTest, CH 11111'
};

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
    Category.build({ name: 'Guitar' }),
    Category.build({ name: 'Drum' }),
    Category.build({ name: 'Bass' })
  ];
  return categories;
}

function generateUsers() {
  const users = _.times(4, () =>
    User.build({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.company.bsBuzz() + faker.address.country(),
      passwordUpdateDate: faker.date.recent(100),
      mailingAddress: `${faker.address.streetAddress()}\n${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`
    })
  );
  // build the non-random test user
  const testUser = User.build(testUserData);
  users.push(testUser);
  return users;
}

function generateReviews() {
  const reviews = _.times(3, () =>
    Review.build({
      rating: Math.floor(Math.random() * Math.floor(4.5)) + 1,
      text: faker.lorem.paragraph(3)
    })
  );
  return reviews;
}

function generateOrders() {
  const testUserOrders = ['Created', 'Processing', 'Cancelled', 'Completed'].map(
    status => {
      return Order.build({
        status,
        dateOrdered: Date.now(),
        mailingAddress: `${faker.address.streetAddress()}\n${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        email: faker.internet.email()
      });
    }
  );

  const randomOrders = ['Created', 'Processing', 'Cancelled', 'Completed', 'Completed'].map(
    status => {
      return Order.build({
        status,
        dateOrdered: Date.now(),
        mailingAddress: testUserData.mailingAddress,
        email: testUserData.email
      });
    }
  );
  return [...testUserOrders, ...randomOrders];
}

function createProducts() {
  return Promise.map(generateProducts(), product => product.save());
}

function createCategories() {
  return Promise.map(generateCategories(), category => category.save());
}

function createUsers() {
  return Promise.map(generateUsers(), user => user.save());
}

function createReviews() {
  return Promise.map(generateReviews(), review => review.save());
}

function createOrders() {
  return Promise.map(generateOrders(), order => order.save());
}

async function seed() {
  await db.sync({ force: true });

  console.log('Seeding Products');
  await createProducts();

  console.log('Seeding Categories');
  await createCategories();

  console.log('Seeding Users');
  await createUsers();

  console.log('Seeding Reviews');
  await createReviews();

  console.log('Seeding Orders');
  await createOrders();

  // categories to products
  const cat1 = await Category.findOne({ where: { name: 'Guitar' } });
  const cat2 = await Category.findOne({ where: { name: 'Drum' } });
  const cat3 = await Category.findOne({ where: { name: 'Bass' } });

  const guitar1 = await Product.findById(10);
  const guitar2 = await Product.findById(11);
  const guitar3 = await Product.findById(12);

  const drum1 = await Product.findById(8);
  const bass1 = await Product.findById(9);

  await cat1.addProducts([guitar1, guitar2, guitar3]);
  await cat2.addProduct(drum1);
  await cat3.addProduct(bass1);

  //reviews to users and products
  const user1 = await User.findById(2);
  const user2 = await User.findById(4);

  const review1 = await Review.findById(1);
  const review2 = await Review.findById(2);
  const review3 = await Review.findById(3);

  await user1.addReview(review1);
  await user1.addReview(review2);
  await user2.addReview(review3);

  await guitar1.addReview(review1);
  await guitar1.addReview(review3);
  await drum1.addReview(review2);
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
