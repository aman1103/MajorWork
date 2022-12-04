const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizResponseSchema = new Schema(
  {
    userAnswer: { type: Array, required: false },
    totalCorrect: { type: Number, required: false },
    totalWrong: { type: Number, required: false },
    userId: { type: String, required: true },
    quizId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const QuizResponse = mongoose.model("QuizResponse", quizResponseSchema);

module.exports = QuizResponse;
