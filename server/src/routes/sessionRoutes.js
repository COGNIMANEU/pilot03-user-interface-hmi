const express = require('express');
const router = express.Router();
const { getSessions, getSessionById, createSession, updateSession, deleteSession, updateStageStatus, advanceStage } = require('../controllers/sessionController');

// Get all sessions
router.get('/', getSessions);

// Get a session by ID
router.get('/:id', getSessionById);

// Create a new session
router.post('/', createSession);

// Update a session
router.put('/:id', updateSession);

// Delete a session
router.delete('/:id', deleteSession);

router.post('/:id/update-stage-status', updateStageStatus);
router.post('/:id/advance', advanceStage);

module.exports = router;