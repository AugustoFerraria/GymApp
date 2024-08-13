const User = require("../models/User");

exports.createUsuario = async (req, res) => {
  try {
    const newUser = new User(req.body);
    if (req.body.professorId) {
      const professor = await User.findById(req.body.professorId);
      if (!professor || professor.role !== "admin") {
        return res.status(400).send({ error: "Profesor no válido" });
      }
      newUser.professor = req.body.professorId;
    }
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send(error);
  }
};

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "surname", "age", "height", "weight"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getStudentsByProfessor = async (req, res) => {
  try {
    console.log('req.user:', req.user);
    const professorId = req.user.id;
    const students = await User.find({ professor: professorId, role: 'user' });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Server Error');
  }
};