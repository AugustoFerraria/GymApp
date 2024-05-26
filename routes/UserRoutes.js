const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/users', userController.createUsuario);
router.get('/users', userController.getUsuarios);
router.get('/users/:id', userController.getUsuarioById);
router.put('/users/:id', userController.updateUsuario);
router.delete('/users/:id', userController.deleteUsuario);

module.exports = router;
