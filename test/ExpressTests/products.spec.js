/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/product/', () => {

    beforeEach( async () => {
      await Product.create({name: 'horn'});
      Product.create({name: 'guitar'});
    });

    it('Gets all Products. GET api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[1].name).to.be.equal('horn');
        });
    });

    it('Gets a product by id. Get /api/products/id', () => {
      return request(app)
        .get('/api/products/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal('guitar');
        });
    });

    it('deletes a product. DELETE /api/products/id/', () => {
      return request(app)
        .delete('/api/products/1')
        .expect(204);
    });
  });
});
