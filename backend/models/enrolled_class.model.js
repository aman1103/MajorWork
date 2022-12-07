const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enrolledClassSchema = new Schema(
  {
    classCode: { type: String, required: false },
    joinCode: { type: String, required: true },
    joinedAt: { type: String, required: true },
    userId: { type: String, required: true },
    className: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const EnrolledClass = mongoose.model("EnrolledClass", enrolledClassSchema);

module.exports = EnrolledClass;
