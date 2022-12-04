const router = require("express").Router();
const lodash = require("lodash");
let QuizResponse = require("../models/quiz_response.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;

  if (!lodash.isEmpty(query_param)) {
    if (query_param.userId) {
      let userId = query_param.userId;
      QuizResponse.find({ userId })
        .then((quiz_responses) => res.status(200).send(quiz_responses))
        .catch(next);
    } else if (query_param.quizId) {
      let quizId = query_param.quizId;
      QuizResponse.find({ quizId })
        .then((quiz_responses) => res.status(200).send(quiz_responses))
        .catch(next);
    } else {
      QuizResponse.find()
        .then((quiz_responses) => res.status(200).send(quiz_responses))
        .catch(next);
    }
  } else {
    QuizResponse.find()
      .then((quiz_responses) => res.status(200).send(quiz_responses))
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  let userAnswer = req.body.userAnswer;
  let totalCorrect = req.body.totalCorrect;
  let totalWrong = req.body.totalWrong;
  let userId = req.body.userId;
  let quizId = req.body.quizId;

  const newQuizResponse = new QuizResponse({
    userAnswer,
    totalCorrect,
    totalWrong,
    userId,
    quizId,
  });

  newQuizResponse
    .save()
    .then((createdQuizResponse) => res.status(200).send(createdQuizResponse))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  Quiz.findById(req.params.id)
    .then((quiz_details) => res.status(200).send(quiz_details))
    .catch(next);
});

router.route("/update/:id").patch((req, res, next) => {
  console.log(req.body);
  QuizResponse.findById(req.params.id)
    .then((quiz_response_details) => {
      quiz_response_details.userAnswer = req.body.userAnswer;
      quiz_response_details
        .save()
        .then((updatedQuizResponse) =>
          res.status(200).send(updatedQuizResponse)
        )
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
