const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validatePassword = require('../utils/passwordValidator');
// Create new user (admin only)
const createUser = async (req, res) => {
  try {
    const { email, role, password } = req.body;
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }
    const user = new User({ email, role, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Authenticate user
const authenticateUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email/password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email/password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role, email:user.email }, 'secret', { expiresIn: rememberMe ? '30d' : '1d' });
    res.status(200).json({ token, user: { _id: user._id, email: user.email, role: user.role }, rememberMe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update password
const updatePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(401).json({ message: 'Invalid old password' });
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, authenticateUser, updatePassword };