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

module.exports = app;