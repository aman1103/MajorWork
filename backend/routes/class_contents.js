const router = require("express").Router();
const lodash = require("lodash");
let ClassContent = require("../models/class_content.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;
  if (!lodash.isEmpty(query_param)) {
    if (query_param.classId) {
      let classId = query_param.classId;
      ClassContent.find({ classId })
        .then((class_contents) =>
          res.status(200).json({ classContent: class_contents })
        )
        .catch(next);
    } else {
      ClassContent.find()
        .then((class_contents) => res.status(200).send(class_contents))
        .catch(next);
    }
  } else {
    ClassContent.find()
      .then((class_contents) => res.status(200).send(class_contents))
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  let rawText = req.body.rawText;
  let attachedFileUrls = req.body.attachedFileUrls;
  let classId = req.body.classId;
  let userId = req.body.userId;
  let postedAt = req.body.postedAt;

  const newClassContent = new ClassContent({
    rawText,
    attachedFileUrls,
    classId,
    userId,
    postedAt,
  });

  newClassContent
    .save()
    .then((createdClassContent) => res.status(200).send(createdClassContent))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  ClassContent.findById(req.params.id)
    .then((class_content) => res.status(200).send(class_content))
    .catch(next);
});

router.route("/:id").delete((req, res, next) => {
  ClassContent.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Class content deleted."))
    .catch(next);
});

module.exports = router;
