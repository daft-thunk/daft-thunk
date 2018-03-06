/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');
const Orders = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/orders/', () => {

    beforeEach( async () => {
      await Orders.create({mailingAddress: 'place', email: 'josh@josh.josh'});
      Orders.create({mailingAddress: 'other place', email: 'kev@kev.kev'});
    });

    it('Gets all Orders. GET api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].mailingAddress).to.be.equal('other place');
        });
    });

    it('Gets a order by id. Get /api/orders/id', () => {
      return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.mailingAddress).to.be.equal('place');
        });
    });

    it('Creates a order. POST /api/orders', () => {
      return request(app)
        .post('/api/orders')
        .send({mailingAddress: 'sother place', email: 'skev@skev.skev'})
        .expect(201);
    });

    it('Updates an orders status. PUT /api/orders/id', () => {
      return request(app)
        .put('/api/orders/1')
        .send({status: 'Completed'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.be.equal('Completed');
        });
    });
  });
});
