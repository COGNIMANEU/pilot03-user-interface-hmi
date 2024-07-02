const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  printing_session_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: Number, required: true, enum: [0, 1, 2] }, // 0: information, 1: warning, 2: critical
  status: { type: Number, required: true, enum: [0, 1, 2] }, // 0: unresolved, 1: resolved, 2: ignored
  action: { type: Array, default: [] },
  created_at: { type: Date, default: Date.now },
  resolved_at: { type: Date }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = { Alert };