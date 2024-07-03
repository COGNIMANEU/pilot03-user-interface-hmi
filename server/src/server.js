const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
const logger = require('./utils/logger')

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/croom-hmi00';

mongoose.set('debug', true); // Enable Mongoose debugging

mongoose.connect(mongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message);
  });