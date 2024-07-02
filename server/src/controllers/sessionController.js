const ManufacturingSession = require('../models/sessionModel');
const {logicUpdateStageStatus, logicAdvanceStage} = require('./businessLogic')
// Get all sessions
const getSessions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  console.log(`Received request to get sessions - Page: ${page}, Limit: ${limit}`);
  try {
    const sessions = await ManufacturingSession.find()
      .sort({ created_at: -1 }) // Sort by created_at in descending order
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ManufacturingSession.countDocuments();

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
    const session = await ManufacturingSession.findById(req.params.id);
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
    const newSession = new ManufacturingSession({
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
    const session = await ManufacturingSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const session = await ManufacturingSession.findByIdAndDelete(req.params.id);
    if (session) {
      res.json({ message: 'Session deleted successfully' });
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStageStatus = async (req, res) => {
  try {
    const { stageIndex, newStatus } = req.body;
    const session = await ManufacturingSession.findById(req.params.id);
    if (!session) throw new Error('Session not found');
    session.updateStageStatus(stageIndex, newStatus);
    await session.save();
    res.status(200).send('Stage status updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const advanceStage = async (req, res) => {
  try {
    const session = await ManufacturingSession.findById(req.params.id);
    if (!session) throw new Error('Session not found');
    session.advanceStage();
    await session.save();
    res.status(200).send('Advanced to next stage successfully');
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
  updateStageStatus,
  advanceStage
};