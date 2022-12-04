const router = require("express").Router();
const lodash = require("lodash");
let Comment = require("../models/comment.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;
  if (!lodash.isEmpty(query_param)) {
    if (query_param.classId) {
      let classId = query_param.classId;
      Comment.find({ classId })
        .then((comments) => res.status(200).send(comments))
        .catch(next);
    } else {
      Comment.find()
        .then((comments) => res.status(200).send(comments))
        .catch(next);
    }
  } else {
    Comment.find()
      .then((comments) => res.status(200).send(comments))
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  let comment = req.body.comment;
  let classId = req.body.classId;
  let contentId = req.body.contentId;
  let userId = req.body.userId;
  let postedAt = req.body.postedAt;

  const newComment = new Comment({
    comment,
    classId,
    contentId,
    userId,
    postedAt,
  });

  newComment
    .save()
    .then((createdComment) => res.status(200).send(createdComment))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  Comment.findById(req.params.id)
    .then((comment) => res.status(200).send(comment))
    .catch(next);
});

router.route("/:id").delete((req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Comment deleted."))
    .catch(next);
});

module.exports = router;
