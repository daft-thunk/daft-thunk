/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db')
const app = require('../../server/index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      const testUser = User.build({
        email: codysEmail
      })
      testUser.setCart(3)
      testUser.save()
      .then((user) =>  user)
    })

    it('As a non admin you cannot retrieve all users. GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(403)
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(403)
    })

  })

}) // end describe('User routes')

