const express = require('express');
const router = express.Router();
const { getSessions, getSessionById, createSession, updateSession, deleteSession, modifyStageStatus } = require('../controllers/sessionController');

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

router.post('/:id/modify-stage-status', modifyStageStatus);

module.exports = router;