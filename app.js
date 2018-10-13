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

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then(foods => {
      response.status(200).json(foods);
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.delete('/api/v1/foods/:id', (request, response) => {
  database('foods').where({ id: request.params.id }).del()
    .then(() => {
      response.status(204);
    })
    .catch(error => {
      response.status(404).json({ error });
    })
});

app.post('/api/v1/foods', (request, response) => {
  const food = request.body;

  for (let requiredParameter of ['name', 'calories']) {
    if (!food['food'][requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { 'food': { 'name': <string>, 'calories': <number> } }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('foods').insert({
      name: food['food']['name'],
      calories: food['food']['calories']
      },
      'id'
    )
    .then(newId => database('foods').where({ id: newId[0] }))
    .then(newFood => {
      response.status(200).json(newFood[0])
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

module.exports = app;
