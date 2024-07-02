const mongoose = require("mongoose");
const fs = require("fs");
const Session = require("./src/models/sessionModel");

mongoose.connect("mongodb://localhost:27017/croom-hmi00");

const sessions = [
  {
    name: "Session 1",
    description: "Description for session 1",
    workstation_id: "workstation_1",
    client_id: "client_1",
    status: 1,
    stages: [
      { stage: 0, status: 2 },
      { stage: 1, status: 1 },
      { stage: 2, status: 0 },
      { stage: 3, status: 0 },
    ],
    created_at: new Date(),
    created_by: "creator_1",
    operator: "operator_1",
    has_build_plan: false,
    has_stl_files: false,
  },
  {
    name: "Session 2",
    description: "Description for session 2",
    workstation_id: "workstation_2",
    client_id: "client_2",
    status: 3,
    stages: [
      { stage: 0, status: 3 },
      { stage: 1, status: 0 },
      { stage: 2, status: 0 },
      { stage: 3, status: 0 },
    ],
    created_at: new Date(),
    created_by: "creator_2",
    operator: "operator_2",
    has_build_plan: true,
    has_stl_files: true,
  },
  {
    name: "Session 3",
    description: "Description for session 3",
    workstation_id: "workstation_3",
    client_id: "client_3",
    status: 2,
    stages: [
      { stage: 0, status: 2 },
      { stage: 1, status: 2 },
      { stage: 2, status: 2 },
      { stage: 3, status: 2 },
    ],
    created_at: new Date(),
    created_by: "creator_3",
    operator: "operator_3",
    has_build_plan: true,
    has_stl_files: false,
  },
  {
    name: "Session 4",
    description: "Description for session 4",
    workstation_id: "workstation_4",
    client_id: "client_4",
    status: 1,
    stages: [
      { stage: 0, status: 2 },
      { stage: 1, status: 1 },
      { stage: 2, status: 0 },
      { stage: 3, status: 0 },
    ],
    created_at: new Date(),
    created_by: "creator_4",
    operator: "operator_4",
    has_build_plan: true,
    has_stl_files: true,
  },
  {
    name: "Session 5",
    description: "Description for session 5",
    workstation_id: "workstation_5",
    client_id: "client_5",
    status: 1,
    stages: [
      { stage: 0, status: 2 },
      { stage: 1, status: 1 },
      { stage: 2, status: 0 },
      { stage: 3, status: 0 },
    ],
    created_at: new Date(),
    created_by: "creator_5",
    operator: "operator_5",
    has_build_plan: false,
    has_stl_files: true,
  },
];

async function seedDatabase() {
  await Session.deleteMany({}); // Clear existing data
  await Session.insertMany(sessions); // Insert new data
  console.log("Database seeded successfully");
  mongoose.connection.close();
}

seedDatabase().catch((err) => {
  console.error("Error seeding database:", err);
  mongoose.connection.close();
});
