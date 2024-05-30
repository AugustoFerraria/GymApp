const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: Number,
  weight: Number,
  height: Number,
  goals: String,
  medicalHistory: String,
  currentRoutine: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }
});

module.exports = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);