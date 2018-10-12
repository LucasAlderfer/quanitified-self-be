const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });
  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  describe('GET /api/v1/meals', () => {
    it('should return all of the meals', done => {
       chai.request(app)
      .get('/api/v1/meals')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('name');
        response.body[0].title.should.equal('Breakfast');
        response.body[0].should.have.property('foods');
        response.body[0].author.should.be.a('array');
        done();
      });
    });
  });
});
