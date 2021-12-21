const Recipe = require('../models/recipe');

module.exports = {
	index,
	create,
	show,
	delete: deleteRecipe,
};

function index(req, res) {
	Recipe.find({}, function (err, recipes) {
		res.render('recipes/index', { title: 'All Recipes', recipes });
	});
}

function create(req, res) {
	const recipe = new Recipe(req.body);
	recipe.user = req.user._id;
	recipe.save(function (err) {
		if (err) {
			console.log(err);
			return res.redirect('/recipes/new');
		}
		console.log(recipe);
		res.redirect('/recipes');
	});
}

function show(req, res) {
	const recipe = Recipe.findById(req.params.id, function (err, recipe) {
		res.render('recipes/show', { recipe });
	});
}

function deleteRecipe(req, res) {
	Recipe.findOneAndDelete(
		{ _id: req.params.id, user: req.user._id },
		function (err) {
			res.redirect('/recipes');
		}
	);
}
