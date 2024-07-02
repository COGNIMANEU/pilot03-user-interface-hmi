const express = require('express');
const { getAlerts, updateAlertStatus, getUnresolvedAlertCount } = require('../controllers/alertController');

const router = express.Router();

router.get('/', getAlerts);
router.put('/:id/status', updateAlertStatus);
router.get('/unresolved-count', getUnresolvedAlertCount);

module.exports = router;