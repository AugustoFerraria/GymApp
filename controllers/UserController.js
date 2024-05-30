const User = require('../models/user');

exports.createUsuario = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
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
        const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!usuario) {
            return res.status(404).send();
        }
        res.status(200).send(usuario);
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