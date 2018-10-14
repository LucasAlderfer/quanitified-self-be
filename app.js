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
    let fullMeal;
    let mealsWithFoods = Array.from(meals, meal => {
      database('foods').select().innerJoin('mealFoods', 'foods.id', 'mealFoods.foodId').where('mealFoods.mealId', meal.id)
      .then(foodsPerMeal => {
        fullMeal = Object.assign({}, meal);
        fullMeal.foods = foodsPerMeal;
        return fullMeal
      })
    })
    return mealsWithFoods
  })
  .then(mealsWithFoods => {
    console.log(mealsWithFoods)
  })
});

app.post('/api/v1/meals/:mealId/foods/:foodId', (request, response) => {
  const foodId = request.params.foodId;
  const foodName = database('foods').where(foodId, foodId)[0].name
  const mealId = request.params.mealId;
  const mealName = database('meals').where(mealId, mealId)[0].name
  const addedMealFood = {
    foodId: foodId,
    mealId: mealId
  };
  if (!database('foods').where(foodId, foodId) || !database('meals').where(mealId, mealId)) {
    return response.status(404)
  };
  database('mealFoods').insert(addedMealFood, 'id')
    .then(mealFood => {
      response.status(201).json({
        "message": `Successfully added ${foodName} to ${mealName}`
    })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;