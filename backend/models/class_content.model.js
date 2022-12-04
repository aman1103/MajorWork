const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classContentSchema = new Schema(
  {
    rawText: { type: String },
    attachedFileUrls: { type: Array },
    classId: { type: String, required: true },
    userId: { type: String, required: true },
    postedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

const ClassContent = mongoose.model("ClassContent", classContentSchema);

module.exports = ClassContent;
