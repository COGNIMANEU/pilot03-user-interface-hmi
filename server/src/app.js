const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const alertRoutes = require('./routes/alertRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes')
const {authenticateToken} = require('./middlewares/authMiddleware')
require('dotenv').config();
const logger = require('./utils/logger');
const app = express();

// Setup request logging
app.use(morgan('combined'));

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your client's URL
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS with specific options
app.use(cors(corsOptions));

app.use(bodyParser.json());


// Error handling
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});


app.use('/api/alerts', authenticateToken, alertRoutes);
app.use('/api/sessions', authenticateToken, sessionRoutes);
app.use('/api/users', userRoutes)
module.exports = app;