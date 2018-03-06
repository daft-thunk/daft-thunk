/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');

describe('review routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/review/', () => {


    it(' Posts a new review. GET api/reviews', () => {
      return request(app)
        .post('/api/reviews')
        .expect(201)
        .send({review: 'this is some text', rating: 1})
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.text).to.be.equal('this is some text');
        });
    });
  });
});
