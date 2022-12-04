const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    instruction: { type: String, required: false },
    quiz_questions: { type: Array, required: true },
    startingDate: { type: String, required: true },
    acceptingQuiz: { type: String, required: true },
    authorId: { type: String, required: true },
    classId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
