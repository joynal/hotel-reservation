const mongoose = require('mongoose');

const { Schema } = mongoose;

const historySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    roomId: { type: Schema.Types.ObjectId, required: true },
    // reserved
    // pendingApproval
    // released
    status: { type: String, default: 'reserved' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ReserveHistory', historySchema);
