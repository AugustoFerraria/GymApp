const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  routineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine', required: true },
  date: { type: Date, default: Date.now },
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  repetitions: { type: Number, required: true },
  sets: { type: Number, required: true },
  weight: { type: Number },
  notes: { type: String }
});

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);