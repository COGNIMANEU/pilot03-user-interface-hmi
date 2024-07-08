const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
  session_id: { type: String, required: true },
  stage: { type: Number, required: true }, // 0 - 3d printing, 1 - parts removal, 2 - support removal, 3 - surface polishing
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: Number, required: true }, // 0 - information, 1 - warning, 2 - critical
  status: { type: Number, required: true, default: 0 }, // 0 - unresolved, 1 - resolved, 2 - ignored
  action: { type: Array, default: [] },
  created_at: { type: Date, default: Date.now },
  resolved_at: { type: Date, default: null }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = { Alert };