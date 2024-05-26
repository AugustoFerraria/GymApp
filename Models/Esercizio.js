const mongoose = require('mongoose');

const ejercicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  videoUrl: String,
  imagenUrl: String,
  categoria: String
});

module.exports = mongoose.model('Ejercicio', ejercicioSchema);
