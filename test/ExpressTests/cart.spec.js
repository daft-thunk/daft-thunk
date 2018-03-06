/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');
const User = db.model('user');
const Cart = db.model('cart');

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/cart/', () => {
    const codysEmail = 'cody@puppybook.com';


    beforeEach( async () => {
      const testUser = await User.create({email: codysEmail});
      const testCart = await Cart.create({});
      testUser.setCart(testCart);
    });

    it('Gets a cart GET api/cart/id', () => {
      return request(app)
        .get('/api/cart/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.equal(1);
        });
    });

    it('creates a cart. POST /api/cart', () => {
      return request(app)
        .post('/api/cart')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.equal(2);
        });
    });

    it('deletes a cart. DELETE /api/user/id/cart', () => {
      return request(app)
        .delete('/api/cart/1')
        .expect(204);
    });
  });
});
