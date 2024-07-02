const express = require('express');
const router = express.Router();
const progressController = require('../controllers/ProgressController');

router.post('/progresses/new', progressController.createProgress);
router.get('/progresses', progressController.getProgresses);
router.get('/progresses/:id', progressController.getProgressById);
router.get('/progresses', progressController.getProgressesByUserIdAndExerciseId);
router.put('/progresses/:id', progressController.updateProgress);
router.delete('/progresses/:id', progressController.deleteProgress);
router.get('/progresses/by-user', progressController.getProgressesByUserId);

module.exports = router;