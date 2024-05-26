const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/ExerciseController');

router.post('/exercises/new', exerciseController.createExercise);
router.get('/exercises/all', exerciseController.getExercises);
router.get('/exercises/:id', exerciseController.getExerciseById);
router.put('/exercises/:id', exerciseController.updateExercise);
router.delete('/exercises/:id', exerciseController.deleteExercise);

module.exports = router;
