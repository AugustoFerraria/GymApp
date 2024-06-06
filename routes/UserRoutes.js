const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/auth');

// Ruta para obtener los datos del usuario actual
router.get('/users/me', auth, userController.getCurrentUser);

// Rutas existentes
router.post('/users/new', userController.createUsuario);
router.get('/users/all', userController.getUsuarios);
router.get('/users/:id', userController.getUsuarioById);
router.put('/users/:id', auth, userController.updateUsuario);
router.delete('/users/:id', auth, userController.deleteUsuario);

module.exports = router;
