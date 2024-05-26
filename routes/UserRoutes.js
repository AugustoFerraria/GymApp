const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/users/new', userController.createUsuario);
router.get('/users/all', userController.getUsuarios);
router.get('/users/:id', userController.getUsuarioById);
router.put('/users/:id', userController.updateUsuario);
router.delete('/users/:id', userController.deleteUsuario);

module.exports = router;
