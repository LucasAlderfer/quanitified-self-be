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
        // response.body[0].should.have.property('name');
        // response.body[0].title.should.equal('Breakfast');
        // response.body[0].should.have.property('foods');
        // response.body[0].author.should.be.a('array');
        done();
      });
    });
  });

  describe('GET /api/v1/foods', () => {
    it('should return all of the foods', done => {
      chai.request(app)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(5);
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
        response.body[0].name.should.be.a('String');
        response.body[0].calories.should.be.a('Number');
        done();
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', () => {
    it('should return a 204 if the food corresponding to the provided id is deleted from the db, and a 400 code if the food is not found', done => {
      chai.request(app)
      .delete('/api/v1/foods/1')
      .end((err, response) => {
        response.should.have.status(204);
        done();
      })
      .then(() => {
        chai.request(app)
        .get('/api/v1/foods')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.length.should.equal(4);
          done();
        })
      })
      done();
    })
  })

  describe('POST /api/v1/foods', () => {
    it('should return the created food or a 400 code', done => {
      chai.request(app)
      .post('/api/v1/foods')
      .send({
        "food": {
          "name": 'Tomatoes',
          "calories": 900
        }
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.should.have.property('name');
        response.body.should.have.property('calories');
        done();
      })
    })
  })

  describe('PATCH /api/v1/foods/:id', () => {
    it('should return an updated food or a 404', done => {
      chai.request(app)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        const newFood = response.body[0].id;
        done();
      })
      .then(() => {
        chai.request(app)
        .patch(`/api/v1/foods/${newFood}`)
        .send({
          "food": {
            "name": 'Newest Food',
            "calories": 475
          }
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('name');
          response.body.should.have.property('calories');
          response.body['id'].should.equal(newFood)
          response.body['name'].should.equal('Newest Food')
          response.body['calories'].should.equal(475)
          done();
        })
      })
      done();
    })
  })
});
