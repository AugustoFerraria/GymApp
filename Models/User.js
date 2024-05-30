const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  registrationDate: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);