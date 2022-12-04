const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    classId: { type: String, required: true },
    contentId: { type: String, required: true },
    userId: { type: String, required: true },
    postedAt: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
