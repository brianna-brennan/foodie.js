const express = require('express');
const router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const isLoggedIn = require('../config/auth');

//GET homepage with all recipes
router.get('/', recipesCtrl.index);

//GET new recipe page
router.get('/new', function (req, res) {
	res.render('recipes/new', { title: 'New Recipe' });
});

//POST -create new recipe if logged in
router.post('/new/add', isLoggedIn, recipesCtrl.create);

//GET- show recipe details
router.get('/:id', recipesCtrl.show);

//Delete recipe
router.delete('/:id', isLoggedIn, recipesCtrl.delete);

module.exports = router;
