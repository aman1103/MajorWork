const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    instruction: { type: String, required: false },
    assignmentFileUrl: { type: String, required: true },
    assignmentMarks: { type: String, required: true },
    name: { type: String, required: false },
    type: { type: String, required: false },
    startingDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    authorId: { type: String, required: true },
    classId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
