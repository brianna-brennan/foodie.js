const Recipe = require('../models/recipe');

module.exports = {
	create,
	delete: deleteReview,
	update,
};

function deleteReview(req, res, next) {
	Recipe.findOne({ 'reviews._id': req.params.id }).then(function (recipe) {
		const review = recipe.reviews.id(req.params.id);
		if (!review.user.equals(req.user._id))
			return res.redirect(`/recipes/${recipe._id}`);
		review.remove();
		recipe
			.save()
			.then(function () {
				res.redirect(`/recipes/${recipe._id}`);
			})
			.catch(function (err) {
				return next(err);
			});
	});
}

function create(req, res) {
	Recipe.findById(req.params.id, function (err, recipe) {
		req.body.user = req.user._id;
		req.body.userName = req.user.name;
		req.body.userAvatar = req.user.avatar;
		recipe.reviews.push(req.body);
		recipe.save(function (err) {
			if (err) console.log(err);
			res.redirect(`/recipes/${recipe._id}`);
		});
	});
}

function update(req, res) {
	Recipe.findOne({ 'reviews._id': req.params.id }, function (err, recipe) {
		console.log(req.user);
		const reviewSubdoc = recipe.reviews.id(req.params.id);
		console.log(recipe);
		if (!reviewSubdoc.user.equals(req.user._id))
			return res.redirect(`/recipes/${recipe._id}`);
		reviewSubdoc.content = req.body.text;
		recipe.save(function (err) {
			res.redirect(`/recipes/${recipe._id}`);
		});
	});
}
