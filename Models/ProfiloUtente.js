const mongoose = require('mongoose');

const perfilUsuarioSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  edad: Number,
  peso: Number,
  altura: Number,
  objetivos: String,
  historialMedico: String,
  rutinaActual: { type: mongoose.Schema.Types.ObjectId, ref: 'Rutina' }
});

module.exports = mongoose.model('PerfilUsuario', perfilUsuarioSchema);
