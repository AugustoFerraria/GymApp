const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Registro de usuarios
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, surname, email, password, age, height, weight, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Email già esistente' });
    }

    user = new User({ name, surname, email, password, age, height, weight, role });
    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role // Incluimos el rol en el payload
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { role: user.role } }); // Devolvemos el token y el rol del usuario
      }
    );
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Errore del server');
  }
};

// Inicio de sesión de usuarios
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenziali non valide' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenziali non valide' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role // Incluimos el rol en el payload
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { role: user.role } }); // Devolvemos el token y el rol del usuario
      }
    );
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Errore del server');
  }
};