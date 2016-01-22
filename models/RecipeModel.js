var orm = require('mongoose');

var RecipeSchema = new orm.Schema({
  recipeName: String,
  rating: Number,
  desc: String
});

module.exports = orm.model('Recipe', RecipeSchema, 'recipe');
