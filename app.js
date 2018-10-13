const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'quantified_self_js';

app.get('/api/v1/meals', (request, response) => {
  database('meals').select()
    .then(meals => {
      response.status(200).json(meals);
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.post('/api/v1/meals/:meal_id/foods/:food_id', (request, response) => {
  let meal_id = request.params.meal_id
  let food_id = request.params.food_id
  // if () {
  //   return response.status(422).send({
  //     error: `Expected format: {title: <string>, author: <string> }. You are missing a "${requiredParameter} property."`
  //   })
  // };
  // database('papers').insert(paper, 'id')
  //   .then(paper => {
  //     response.status(201).json({ id: paper[0] })
  //   })
  //   .catch(error => {
  //     response.status(500).json({ error });
  //   })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;