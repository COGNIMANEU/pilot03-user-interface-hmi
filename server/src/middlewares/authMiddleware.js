const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secret', (err, user) => {
    console.log('token: ', token)
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 0) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };