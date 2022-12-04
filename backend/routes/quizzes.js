const router = require("express").Router();
const lodash = require("lodash");
let Quiz = require("../models/quiz.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;
  if (!lodash.isEmpty(query_param)) {
    if (query_param.classId) {
      let classId = query_param.classId;
      Quiz.find({ classId })
        .then((quizzes) => res.status(200).send(quizzes))
        .catch(next);
    } else {
      Quiz.find()
        .then((quizzes) => res.status(200).send(quizzes))
        .catch(next);
    }
  } else {
    Quiz.find()
      .then((quizzes) => res.status(200).send(quizzes))
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  let title = req.body.title;
  let instruction = req.body.instruction;
  let quiz_questions = req.body.quiz_questions;
  let startingDate = req.body.startingDate;
  let acceptingQuiz = req.body.acceptingQuiz;
  let authorId = req.body.authorId;
  let classId = req.body.classId;

  const newQuiz = new Quiz({
    title,
    instruction,
    quiz_questions,
    startingDate,
    acceptingQuiz,
    authorId,
    classId,
  });

  newQuiz
    .save()
    .then((createdQuiz) => res.status(200).send(createdQuiz))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  Quiz.findById(req.params.id)
    .then((quiz_details) => res.status(200).send(quiz_details))
    .catch(next);
});

router.route("/update/:id").patch((req, res, next) => {
  Quiz.findById(req.params.id)
    .then((quiz_details) => {
      quiz_details.quiz_questions = req.body.quiz_questions;

      quiz_details
        .save()
        .then((updatedQuiz) => res.status(200).send(updatedQuiz))
        .catch(next);
    })
    .catch(next);
});

router.route("/update-accepting-response/:id").patch((req, res, next) => {
  Quiz.findById(req.params.id)
    .then((quiz_details) => {
      quiz_details.acceptingQuiz = req.body.acceptingQuiz;

      quiz_details
        .save()
        .then((updatedQuiz) => res.status(200).send(updatedQuiz))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
