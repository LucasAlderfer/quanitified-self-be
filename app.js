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
  let meals = database('meals').select();
  let fullMeal;
  let mealsWithFoods = meals.map(meal => {
    return database('foods').select().innerJoin('mealFoods', 'foods.id', 'mealFoods.foodId').where('mealFoods.mealId', meal.id)
    .then(foodsPerMeal => {
      fullMeal = Object.assign({}, meal);
      fullMeal.foods = foodsPerMeal;
      return fullMeal
    })
  });
  Promise.resolve(mealsWithFoods)
  .then(mealsWithFoods => {
    response.status(200).json(mealsWithFoods)
  })
  .catch(error => response.json({ error }));
});

app.post('/api/v1/meals/:mealId/foods/:foodId', (request, response) => {
  const mealId = request.params.mealId;
  const foodId = request.params.foodId;
  const addedMealFood = {
    foodId: foodId,
    mealId: mealId
  };
  const meal = database('meals').find(id, mealId);
  const food = database('foods').find(id, foodId);
  database('mealFoods').insert(addedMealFood, 'id')
  .then(mealFood => {
    response.status(201).json({
      "message": `Successfully added ${food.name} to ${meal.name}`
    })
  })
  .catch(error => {
    response.status(404).json({ error });
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
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

app.patch('/api/v1/foods/:id', (request, response) => {
  const newFood = request.body

  for (let requiredParameter of ['name', 'calories']) {
    if (!newFood['food'][requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { 'food': { 'name': <string>, 'calories': <number> } }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('foods').where({id: request.params.id}).update({
    name: newFood['food']['name'],
    calories: newFood['food']['calories']
  })
  .then(() => database('foods').where({id: request.params.id}))
  .then(updatedFood => {
    response.status(200).json(updatedFood[0])
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

module.exports = app;
