const express = require('express');
const router = express.Router();
const {updateStageStatus} = require('../controllers/statusController')

// POST /api/status
router.post('/', updateStageStatus);
module.exports = router;