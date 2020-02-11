const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    availableAmount: { type: Number, default: 0 },
    requiredPoints: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Room', roomSchema);
