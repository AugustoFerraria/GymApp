const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post(
  '/register',
  [
    check('name', 'Nome è obbligatorio').not().isEmpty(),
    check('surname', 'Cognome è obbligatorio').not().isEmpty(),
    check('email', 'Per favore includi una email valida').isEmail(),
    check('password', 'La password deve avere almeno 6 caratteri').isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Per favore includi una email valida').isEmail(),
    check('password', 'Password è obbligatorio').exists(),
  ],
  authController.login
);

module.exports = router;