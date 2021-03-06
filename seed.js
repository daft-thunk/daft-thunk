const _ = require('lodash');
const faker = require('faker');
faker.seed(199);

const {
  Product,
  Category,
  User,
  Review,
  Order,
  Cart
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
  mailingAddress: '123 Test\nTest, CH 11111',
  role: 'admin'
};

function generateProducts() {
  let data = [{
    name: 'Fender Telecaster',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'Fender',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/fender-telecaster.png'
  },
  {
    name: 'Gibson Les Paul',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'Gibson',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/les-paul-tribute.png'
  },
  {
    name: 'Martin X',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'Martin',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/martin-x.png'
  },
  {
    name: 'Fender Precision Bass',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'Martin',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/fender-p.png'
  },
  {
    name: 'Martin X',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'Martin',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/martin-x.png'
  },
  {
    name: 'Korg microKORG',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'Korg',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/micro-korg.png'
  },
  {
    name: 'Moog Sub-37',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'Moog',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/moog-sub37.png'
  },
  {
    name: 'DW Performance Series',
    price: (Math.random() * 1000).toFixed(2),
    description: faker.lorem.paragraph(4),
    manufacturer: 'DW',
    stock: Math.floor(Math.random() * Math.floor(20)),
    imageUrl: '/images/dw-performance.png'
  }];

  let products = [];
  data.forEach(product => {
    products.push(Product.build(product));
  });
  return products;
}

function generateCategories() {
  const categories = [
    Category.build({ name: 'Guitar' }),
    Category.build({ name: 'Drum' }),
    Category.build({ name: 'Bass' }),
    Category.build({ name: 'Keyboard' })
  ];
  return categories;
}

function generateUsers() {
  // build and save the non-random test user
  const testUser = User.create(testUserData);

  const randomUsers = _.times(4, () =>
    User.build({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.company.bsBuzz() + faker.address.country(),
      passwordUpdateDate: faker.date.recent(100),
      mailingAddress: `${faker.address.streetAddress()}\n${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`
    })
  );
  return [testUser, ...randomUsers];
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
  const testUserOrders = ['Created', 'Processing', 'Cancelled', 'Completed', 'Completed'].map(
    status => {
      return Order.build({
        status,
        dateOrdered: Date.now(),
        mailingAddress: testUserData.mailingAddress,
        email: testUserData.email,
        userId: 1,
        cartId: 1
      });
    }
  );

  const randomOrders = ['Created', 'Processing', 'Cancelled', 'Completed'].map(
    status => {
      return Order.build({
        status,
        dateOrdered: Date.now(),
        mailingAddress: `${faker.address.streetAddress()}\n${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        email: faker.internet.email(),
      });
    }
  );

  return [...testUserOrders, ...randomOrders];
}

function generateCarts() {
  return _.times(3, () => Cart.build({}))
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

function createCarts() {
  return Promise.map(generateCarts(), cart => cart.save());
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

  // note - this creates one cart for test user
  console.log('Seeding Cart');
  await Cart.create();

  console.log('Seeding Orders');
  await createOrders();

  console.log('Seeding Carts');
  await createCarts();

  // categories to products
  const cat1 = await Category.findOne({ where: { name: 'Guitar' } });
  const cat2 = await Category.findOne({ where: { name: 'Drum' } });
  const cat3 = await Category.findOne({ where: { name: 'Bass' } });
  const cat4 = await Category.findOne({ where: { name: 'Keyboard' } });

  const guitar1 = await Product.findById(1);
  const guitar2 = await Product.findById(2);
  const guitar3 = await Product.findById(3);
  const guitar4 = await Product.findById(5);

  const drum1 = await Product.findById(8);

  const bass1 = await Product.findById(4);

  const keys1 = await Product.findById(6);
  const keys2 = await Product.findById(7);

  await cat1.addProducts([guitar1, guitar2, guitar3, guitar4]);
  await cat2.addProduct(drum1);
  await cat3.addProduct(bass1);

  await cat4.addProduct(keys1, keys2);

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

  // products to Carts
  const cart1 = await Cart.findById(1);
  const cart2 = await Cart.findById(2);
  await cart1.addProduct(guitar1.id);
  await cart2.addProduct(drum1.id);
  // console.log(cart1);

  await user1.setCart(cart1);
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
