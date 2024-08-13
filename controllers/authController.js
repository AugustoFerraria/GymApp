const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Registro de usuarios
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, surname, email, password, age, height, weight, role, professorId } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Email già esistente' });
    }

    user = new User({ name, surname, email, password, age, height, weight, role });

    if (role === 'user' && professorId) {
      const professor = await User.findById(professorId);
      if (!professor || professor.role !== 'admin') {
        return res.status(400).json({ msg: 'Professor non valido' });
      }
      user.professor = professorId;
    }

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { role: user.role } });
      }
    );
  } catch (err) {
    console.error('Errore del server:', err.message);
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
        role: user.role
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { role: user.role } });
      }
    );
  } catch (err) {
    console.error('Errore del server:', err.message);
    res.status(500).send('Errore del server');
  }
};