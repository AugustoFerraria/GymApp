const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('username', 'Please include a valid username').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('age', 'Age is required').isNumeric(),
    check('weight', 'Weight is required').isFloat(),
    check('height', 'Height is required').isFloat(),
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('username', 'Please include a valid username').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

module.exports = router;