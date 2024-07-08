const mongoose = require('mongoose');
const { Alert } = require('../models/alertModel');
const logger = require('../utils/logger');

// Get alerts with pagination
// Get unresolved alerts with pagination
const getAlerts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  logger.info(`Received request to get alerts - Page: ${page}, Limit: ${limit}`);

  try {
    const alerts = await Alert.find({ status: 0 })
      .sort({ created_at: -1 }) // Sort by created_at in descending order
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Alert.countDocuments({ status: 0 });

    res.status(200).json({
      alerts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(`Error while fetching alerts: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update the status of an alert
const updateAlertStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  logger.info(`Received request to update alert status - Alert ID: ${id}, Status: ${status}`);
  // logger.info(JSON.stringify(req.params));
  try {
    const alert = await Alert.findById(id);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    logger.info('Found the alert')
    alert.status = status;
    if (status === 1) {
      alert.resolved_at = new Date();
    }
    await alert.save();

    res.status(200).json({ alert_id: id, status: status, resolved_at: alert.resolved_at });
  } catch (error) {
    console.error(`Error while updating alert status: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get count of unresolved alerts
const getUnresolvedAlertCount = async (req, res) => {
  try {
    const count = await Alert.countDocuments({ status: 0 });
    res.status(200).json({ count });
  } catch (error) {
    console.error(`Error while fetching unresolved alert count: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addNewAlert = async (req, res) => {
  try {
    const { session_id, stage, title, description, type } = req.body;
    logger.debug( session_id, stage, title, description, type);
    // Validate input
    if (!session_id || stage === undefined || !title || !description || type === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new alert
    const newAlert = new Alert({ session_id, stage, title, description, type,  });
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: 'Server error', error });
  }
}
module.exports = { getAlerts,addNewAlert, updateAlertStatus, getUnresolvedAlertCount };