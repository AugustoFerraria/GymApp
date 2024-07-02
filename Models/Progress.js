const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  date: { type: Date, default: Date.now, required: true },
  weight: { type: Number },
  reps: { type: Number },
});

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);