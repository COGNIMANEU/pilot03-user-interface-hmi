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
  currentStageIndex: { type: Number, default: 0 },
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

// Methods for updating stage status, updating global status, and finding current stage
const validTransitions = [
  [0, 1],
  [1, 2],
  [1, 3],
  [0, 3]
];

SessionSchema.methods.updateStageStatus = function(stageIndex, newStatus) {
  if (this.status === 2 || this.status === 3) {
    throw new Error('Current session is already finished and cannot be updated');
  }

  const currentStage = this.stages[stageIndex];
  if (!currentStage || (currentStage.status !== 0 && currentStage.status !== 1)) {
    throw new Error('Current stage is already finished and cannot be updated');
  }

  const isValidTransition = validTransitions.some(([oldStatus, status]) =>
    oldStatus === currentStage.status && status === newStatus
  );

  if (!isValidTransition) {
    throw new Error('Invalid status transition');
  }

  // Validate previous stages (status should be 2)
  for (let i = 0; i < stageIndex; i++) {
    if (this.stages[i].status !== 2) {
      throw new Error(`Previous stage ${i} is not completed`);
    }
  }

  // Validate next stages (status should be 0)
  for (let i = stageIndex + 1; i < this.stages.length; i++) {
    if (this.stages[i].status !== 0) {
      throw new Error(`Next stage ${i} has already started or finished`);
    }
  }

  // Update the status of the specified stage
  this.stages[stageIndex].status = newStatus;
  this.currentStageIndex = stageIndex;
  return this.updateGlobalStatus();
};

SessionSchema.methods.modifyStageStatus = function(stageIndex, newStatus) {
  // Validate and update previous stages (status should be 2)
  for (let i = 0; i < stageIndex; i++) {
    if (this.stages[i].status !== 2) {
      this.stages[i].status = 2;
    }
  }

  // Validate and update next stages (status should be 0)
  for (let i = stageIndex + 1; i < this.stages.length; i++) {
    if (this.stages[i].status !== 0) {
      this.stages[i].status = 0;
    }
  }

  // Update the status of the specified stage
  this.stages[stageIndex].status = newStatus;
  this.currentStageIndex = stageIndex;
  return this.updateGlobalStatus();
};

SessionSchema.methods.updateGlobalStatus = function() {
  const currentStage = this.stages[this.currentStageIndex];
  this.status = 1;

  if (currentStage.status === 3) {
    this.status = 3;
  } else if (currentStage.status === 2) {
    if (this.currentStageIndex === this.stages.length - 1) {
      this.status = 2;
    }else {
      this.currentStageIndex += 1; // jump stage
    }
  } else if (currentStage.status === 0 && this.currentStageIndex === 0) {
    this.status = 0;
  }
  return this.save();
};

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;