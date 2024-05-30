const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  videoUrl: String,
  imageUrl: String,
  category: String
});

module.exports = mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema);