const express = require('express');
const { createUser, authenticateUser, updatePassword } = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', authenticateUser);
router.put('/update-password', authenticateToken, updatePassword);
router.post('/create-user', authenticateToken, isAdmin, createUser);

module.exports = router;