const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentResponseSchema = new Schema(
  {
    assignmentFileUrl: { type: String, required: true },
    marks: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: String, required: false },
    userId: { type: String, required: true },
    assignment_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AssignmentResponse = mongoose.model(
  "AssignmentResponse",
  assignmentResponseSchema
);

module.exports = AssignmentResponse;
