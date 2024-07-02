const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/croom-hmi00';

mongoose.set('debug', true); // Enable Mongoose debugging

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });