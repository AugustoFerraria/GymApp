const mongoose = require('mongoose');

const progresoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  rutinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rutina', required: true },
  fecha: { type: Date, default: Date.now },
  ejercicioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ejercicio', required: true },
  repeticiones: { type: Number, required: true },
  series: { type: Number, required: true },
  peso: { type: Number },
  notas: { type: String }
});

module.exports = mongoose.model('Progreso', progresoSchema);
