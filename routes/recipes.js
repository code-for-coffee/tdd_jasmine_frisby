var express = require('express');
var router = express.Router();
var RecipeModel = require('../models/RecipeModel');

/* GET recipes listing. */
router.get('/', function(req, res) {
  RecipeModel.find({}, function(error, recipes) {
    res.json(recipes);
  })
});

router.get('/:id', function(req, res, next) {
  RecipeModel.findById(req.params.id, function(error, recipe) {
    console.log(error);
    console.log(recipe);
    res.json(recipe);
  })
});

router.post('/', function(req, res) {
  RecipeModel.create(req.body, function(error, recipe){
    console.log(error);
    console.log(recipe);
    res.json(recipe);
  });
});

router.put('/:id', function(req, res) {
  RecipeModel.findByIdAndUpdate(req.params.id, req.body, function(error, recipe) {
    console.log(error);
    console.log(recipe);
    res.json(recipe);
  })
});

router.delete('/:id', function(req, res) {
  RecipeModel.findByIdAndRemove(req.params.id, req.body, function(error, recipe) {
    console.log(error);
    console.log(recipe);
    res.json({
      message: 'Recipe was deleted'
    })
  });
});

module.exports = router;
