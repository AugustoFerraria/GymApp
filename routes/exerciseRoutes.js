const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/ExerciseController');
const progressController = require('../controllers/ProgressController');

router.post('/exercises', exerciseController.createExercise);
router.get('/exercises', exerciseController.getExercises);
router.get('/exercises/:id', exerciseController.getExerciseById);
router.put('/exercises/:id', exerciseController.updateExercise);
router.delete('/exercises/:id', exerciseController.deleteExercise);

router.post('/progresses', progressController.createProgress);
router.get('/progresses', progressController.getProgresses);
router.get('/progresses/:id', progressController.getProgressById);
router.put('/progresses/:id', progressController.updateProgress);
router.delete('/progresses/:id', progressController.deleteProgress);

module.exports = router;