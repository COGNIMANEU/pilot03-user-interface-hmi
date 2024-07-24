const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const alertRoutes = require('./routes/alertRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes')
const statusRoutes = require('./routes/statusRoutes')
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

// Swagger API Docs
// Load Swagger JSON file
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, './swagger-api-docs.json'), 'utf8'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/alerts', authenticateToken, alertRoutes);
app.use('/api/sessions', authenticateToken, sessionRoutes);
app.use('/api/status', authenticateToken, statusRoutes);
app.use('/api/users', userRoutes)

// Serve the static files from the React app
const buildPath = path.join(__dirname, '../../client', 'dist'); // Adjust path according to your setup
app.use(express.static(buildPath));

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

module.exports = app;