const express = require('express');
const router = express.Router();
const RoutineController = require('../controllers/RoutineController');
const auth = require('../middleware/auth');

router.post('/create', auth, RoutineController.createRoutine);
router.get('/student/:studentId', auth, RoutineController.getStudentRoutines);
router.get('/:id', auth, RoutineController.getRoutineById);
router.put('/:id', auth, RoutineController.updateRoutine);
router.delete('/:id', auth, RoutineController.deleteRoutine);

module.exports = router;