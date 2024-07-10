const Session = require('../models/sessionModel');
const logger = require('../utils/logger');
// Get all sessions
const getSessions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  logger.info(`Received request to get sessions - Page: ${page}, Limit: ${limit}`);
  try {
    const sessions = await Session.find()
      .sort({ created_at: -1 }) // Sort by created_at in descending order
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Session.countDocuments();

    res.status(200).json({
      sessions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(`Error while fetching sessions: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a session by ID
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new session
const createSession = async (req, res) => {
  try {
    const { name, description, workstation_id, client_id, stage, status, created_by } = req.body;
    const newSession = new Session({
      name,
      description,
      workstation_id: workstation_id ? workstation_id:'default_workstation',
      client_id : client_id ? client_id: 'unspecified_client',
      stage, status, created_by
    });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a session
const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (session) {
      res.json({ message: 'Session deleted successfully' });
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyStageStatus = async (req, res) => {
  try {
    const { stageIndex, newStatus } = req.body;
     // Validate input
     if (stageIndex === undefined || newStatus === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Modify the stage status with validation
    try {
      await session.modifyStageStatus(stageIndex, newStatus);
      res.status(200).json(session);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  modifyStageStatus
};