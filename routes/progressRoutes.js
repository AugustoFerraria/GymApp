const express = require('express');
const router = express.Router();
const progressController = require('../controllers/ProgressController');

router.post('/progresses/new', progressController.createProgress);
router.get('/progresses.all', progressController.getProgresses);
router.get('/progresses/:id', progressController.getProgressById);
router.put('/progresses/:id', progressController.updateProgress);
router.delete('/progresses/:id', progressController.deleteProgress);

module.exports = router;