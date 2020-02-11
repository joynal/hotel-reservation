const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'user' },
    bonusPoints: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
