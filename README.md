# QUANTIFIEDself Back-end
This is the back-end API endpoints server for the QUANTIFIEDself web application.  The API end points are described below.

## BASE API URL
https://blooming-sea-65150.herokuapp.com

## API End Points
### Foods
##### GET /api/v1/foods
Returns a collection of all food objects with id, name, and calorie attributes as shown below.  
```
[
    {
        "id": 1,
        "name": "banana",
        "calories": 150
    },
    {
        "id": 2,
        "name": "apple",
        "calories": 100
    }
]
``` 
##### POST /api/v1/foods
Creates food object, requires name and calorie attributes as shown below.  
```
{ "food": { "name": "Name of food here", "calories": "Calories here"} }
```
##### PATCH /api/v1/foods/:id
Updates food object of specific :id with name and calorie attributes (both required). Format same as post.
##### DELETE /api/v1/foods/:id
Deletes food object of specific :id.  
### Meals
##### GET /api/v1/meals
Returns a collection of all meal objects with id, name, and a collection of food objects as shown below.  
```
[
    {
        "id": 1,
        "name": "breakfast",
        "foods": [
            {
                "id": 1,
                "name": "banana",
                "calories": 150
            },
            {
                "id": 2,
                "name": "apple",
                "calories": 100
            }
        ]
    },
    {
        "id": 2,
        "name": "lunch",
        "foods": [
            {
                "id": 2,
                "name": "apple",
                "calories": 100
            },
            {
                "id": 3,
                "name": "toast",
                "calories": 75
            },
            {
                "id": 4,
                "name": "strawberries",
                "calories": 200
            }
        ]
    }
]
```
##### POST /api/v1/meals/:meal_id/foods/:id
Links a valid food object of specific :id to a valid meal object of specific :meal_id. Will return message below if successful.
```
{
    "message": "Successfully added FOODNAME to MEALNAME"
}
```
##### DELETE /api/v1/meals/:meal_id/foods/:id
Removes a valid food object of specific :id from a valid meal object of specific :meal_id. Will return message below if successful.  
```
{
    "message": "Successfully removed FOODNAME from MEALNAME"
}
```

## Initial Setup

1. Clone the repository down locally

  ```
  git clone https://github.com/LucasAlderfer/quantified-self-be.git
  ```
2. CD into the `quantified-self-be` directory

3. Install the dependencies

  ```
  npm install
  ```

## Running the Server Locally

To see the code in action locally, you need to fire up a development server. Use the command:

```
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:3000/` to run your application.

## Running Tests with Mocha

To run the local test suite, run the mocha command shown below

```
mocha --exit
```

## Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)
* [Yummly API](https://developer.yummly.com/)
