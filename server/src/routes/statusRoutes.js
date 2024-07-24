const express = require('express');
const router = express.Router();
const {updateStageStatus} = require('../controllers/statusController')

router.post('/', updateStageStatus);
module.exports = router;