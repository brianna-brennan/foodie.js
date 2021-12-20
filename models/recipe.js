const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		content: { type: String, required: true },
		rating: { type: Number, min: 1, max: 5, default: 5 },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		userName: String,
		userAvatar: String,
	},
	{ timestamps: true }
);

const recipeSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		ingredients: {
			type: String,
			required: true,
		},
		instructions: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
