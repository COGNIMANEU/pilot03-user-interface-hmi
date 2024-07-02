const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StageSchema = new Schema({
  stage: { type: Number, required: true },
  status: { type: Number, required: true, enum: [0, 1, 2, 3] }, // 0: Not started, 1: In progress, 2: Completed, 3: Halted
});

const SessionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  workstation_id: { type: String, required: true },
  client_id: { type: String, required: true },
  status: { type: Number, required: true, enum: [0, 1, 2, 3] }, // 0: Not started, 1: In progress, 2: Terminated, 3: Halted
  stages: { type: [StageSchema], default: [
    { stage: 0, status: 0 },
    { stage: 1, status: 0 },
    { stage: 2, status: 0 },
    { stage: 3, status: 0 }
  ]},
  created_at: { type: Date, default: Date.now },
  started_at: { type: Date },
  terminated_at: { type: Date },
  last_updated: { type: Date, default: Date.now },
  created_by: { type: String, required: true },
  operator: { type: String },
  has_build_plan: { type: Boolean, default: false },
  has_stl_files: { type: Boolean, default: false },
});

// Method to update the global status of the session
SessionSchema.methods.updateGlobalStatus = function() {
  if (this.stages.length === 0) {
    this.status = 0;
  } else {
    const currentStage = this.stages[this.stages.length - 1];
    if (currentStage.stage === 0 && currentStage.status === 0) {
      this.status = 0;
    } else if (currentStage.stage === 3 && currentStage.status === 2) {
      this.status = 2;
    } else if (currentStage.status === 3) {
      this.status = 3;
    } else {
      this.status = 1;
    }
  }
  this.last_updated = Date.now();
};

// Method to update the status of a specific stage and adjust other stages accordingly
SessionSchema.methods.updateStageStatus = function(stageIndex, newStatus) {
  if (this.stages[stageIndex]) {
    this.stages[stageIndex].status = newStatus;

    // Ensure all previous stages have status 2
    for (let i = 0; i < stageIndex; i++) {
      this.stages[i].status = 2;
    }

    // Ensure all next stages have status 0
    for (let i = stageIndex + 1; i < this.stages.length; i++) {
      this.stages[i].status = 0;
    }

    this.updateGlobalStatus();
  } else {
    throw new Error('Stage not found');
  }
};

// Method to advance to the next stage
SessionSchema.methods.advanceStage = function() {
  const currentStageIndex = this.stages.length - 1;
  const currentStage = this.stages[currentStageIndex];
  if (currentStage.stage < 3) {
    // Set the current stage status to 2 (Completed)
    this.stages[currentStageIndex].status = 2;
    // Add the next stage with status 0 (Not started)
    this.stages.push({ stage: currentStage.stage + 1, status: 0 });
  } else {
    throw new Error('Session is already at the final stage');
  }

  this.updateGlobalStatus();
};

module.exports = mongoose.model('Session', SessionSchema);