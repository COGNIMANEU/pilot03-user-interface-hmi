const Session = require('../models/sessionModel');
const logger = require('../utils/logger');

const updateStageStatus = async (req, res) => {
  try {
    const { session_id, stage, status } = req.body;

    // Validate input
    if (!session_id || stage === undefined || status === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the session by session_id
    const session = await Session.findById(session_id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Update the stage status with validation
    try {
      await session.updateStageStatus(stage, status);
      res.status(200).json(session);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { updateStageStatus}