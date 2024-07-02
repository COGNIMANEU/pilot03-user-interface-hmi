const ManufacturingSession = require('../models/sessionModel');
async function logicUpdateStageStatus(sessionId, stageIndex, newStatus) {
  const session = await ManufacturingSession.findById(sessionId);
  if (!session) throw new Error('Session not found');

  // Update the specific stage status
  if (session.stages[stageIndex]) {
    session.stages[stageIndex].status = newStatus;
  } else {
    throw new Error('Stage not found');
  }

  // Ensure all previous stages have status 2
  for (let i = 0; i < stageIndex; i++) {
    session.stages[i].status = 2;
  }

  // Ensure all next stages have status 0
  for (let i = stageIndex + 1; i < session.stages.length; i++) {
    session.stages[i].status = 0;
  }

  session.updateGlobalStatus();
  await session.save();
}

async function logicAdvanceStage(sessionId) {
  const session = await ManufacturingSession.findById(sessionId);
  if (!session) throw new Error('Session not found');

  const currentStageIndex = session.stages.length - 1;
  const currentStage = session.stages[currentStageIndex];
  if (currentStage.stage < 7) {
    // Set the current stage status to 2 (Completed)
    session.stages[currentStageIndex].status = 2;
    // Add the next stage with status 0 (Not started)
    session.stages.push({ stage: currentStage.stage + 1, status: 0 });
  } else {
    throw new Error('Session is already at the final stage');
  }

  session.updateGlobalStatus();
  await session.save();
}

module.exports = {
  logicUpdateStageStatus,
  logicAdvanceStage
}