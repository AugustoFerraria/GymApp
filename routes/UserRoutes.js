const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/auth');

router.get('/users/students', auth, userController.getStudentsByProfessor);
router.get('/users/me', auth, userController.getCurrentUser);
router.post('/users/new', userController.createUsuario);
router.get('/users/all', userController.getUsuarios);

router.get('/users/:id', userController.getUsuarioById);
router.put('/users/:id', auth, userController.updateUsuario);
router.delete('/users/:id', auth, userController.deleteUsuario);

module.exports = router;