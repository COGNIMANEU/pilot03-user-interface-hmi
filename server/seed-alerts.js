const mongoose = require('mongoose');
const Alert = require('./src/models/alertModel');
const Session = require('./src/models/sessionModel');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/croom-hmi00');

const alertTypes = [0, 1, 2];
const alertStages = [0, 1, 2, 3];
const alertStatuses = [0, 1, 2];
const titles = ['Temperature too high', 'Support structure missing', 'Material overflow', 'Layer shift detected', 'Nozzle blockage detected'];
const descriptions = [
  'The temperature exceeded the safe threshold.',
  'Support structure was not detected in the expected location.',
  'Material overflow detected during printing.',
  'A layer shift has been detected in the print.',
  'The nozzle is blocked, reducing material flow.'
];

async function generateAlerts() {
  try {
    // Fetch all sessions
    const sessions = await Session.find();

    if (!sessions.length) {
      console.log('No sessions found in the database.');
      return;
    }

    const alerts = [];

    for (let i = 0; i < 30; i++) {
      const session = sessions[Math.floor(Math.random() * sessions.length)];
      const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const stage = alertStages[Math.floor(Math.random() * alertStages.length)];
      const status = alertStatuses[0]; // All alerts are initially unresolved

      const alert = new Alert({
        session_id: session._id,
        stage: stage,
        title: titles[Math.floor(Math.random() * titles.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        type: type,
        status: status,
        created_at: new Date(),
      });

      alerts.push(alert);
    }
    await Alert.deleteMany({}); // Clear old data
    await Alert.insertMany(alerts);
    console.log('30 alerts have been successfully generated and inserted into the database.');
  } catch (error) {
    console.error('Error generating alerts:', error);
  } finally {
    mongoose.connection.close();
  }
}

generateAlerts();