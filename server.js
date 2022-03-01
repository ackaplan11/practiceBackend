const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const PORT = 4000
const data = require('./data.json')

app.listen(PORT, () => console.log(`Express Server listening on Port ${PORT}`))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/recipes', (req, res) => {
    const recipeNames = []
    for (const recipe of data.recipes) {
        recipeNames.push(recipe.name)
    }
    res.json({recipeNames: recipeNames})
})

app.get('/recipes/details/:recipeName', (req, res) => {
    for (const recipe of data.recipes) {
        if (recipe.name === req.params.recipeName) {       
            return res.json({details: {
                ingredients: recipe.ingredients,
                numSteps: recipe.instructions.length
            }})
        }
    }
    res.json({})
})

app.put('/recipes', (req, res) => {
    const name = req.query.name
    for (const recipe of data.recipes) {
        if (name === recipe.name) {
            return res.status(204) 
        }
    }
    return res.json({error: "recipe does not exist"}).status(404)
})