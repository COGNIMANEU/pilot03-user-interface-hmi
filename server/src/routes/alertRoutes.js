const express = require('express');
const { getAlerts, updateAlertStatus, getUnresolvedAlertCount, addNewAlert } = require('../controllers/alertController');

const router = express.Router();

router.get('/', getAlerts);
router.post('/', addNewAlert);
router.put('/:id/status', updateAlertStatus);
router.get('/unresolved-count', getUnresolvedAlertCount);

module.exports = router;