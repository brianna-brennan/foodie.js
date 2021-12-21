const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.put('/reviews/:id/', reviewsCtrl.update);

//CREATE- create new review
router.post('/recipes/:id/reviews', reviewsCtrl.create);

// DELETE "/reviews/:id" - Delete Review Route
router.delete('/reviews/:id', reviewsCtrl.delete);

module.exports = router;
