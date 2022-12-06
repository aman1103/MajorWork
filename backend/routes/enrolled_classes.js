const router = require("express").Router();
const lodash = require("lodash");
let EnrolledClass = require("../models/enrolled_class.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;
  if (!lodash.isEmpty(query_param)) {
    if (query_param.userId) {
      let userId = query_param.userId;
      EnrolledClass.find({ userId })
        .then((enrolled_classes) => res.status(200).send(enrolled_classes))
        .catch(next);
    } else if (query_param.classCode) {
      let classCode = query_param.classCode;
      EnrolledClass.find({ classCode })
        .then((enrolled_classes) => res.status(200).send(enrolled_classes))
        .catch(next);
    } else {
      res.status(200).send({ message: "This query parameter is not allowed!" });
    }
  } else {
    EnrolledClass.find()
      .then((enrolled_classes) => res.status(200).send(enrolled_classes))
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  //let classCode = req.body.classCode;
  let joinCode = req.body.joinCode;
  let joinedAt = Date.now();
  let userId = req.body.userId;

  const newEnrolledClass = new EnrolledClass({
    //classCode,
    joinCode,
    userId,
    joinedAt,
  });

  newEnrolledClass
    .save()
    .then((createdEnrolledClass) => res.status(200).send(createdEnrolledClass))
    .catch(next);
});

router.route("/:userId/:joinCode").get((req, res, next) => {
  let joinCode = req.params.joinCode;
  let userId = req.params.userId;

  EnrolledClass.findOne({ joinCode, userId }).exec((err, already_enrolled) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    console.log(already_enrolled);
    return res.status(200).send(already_enrolled);
  });
});

router.route("/:id").delete((req, res, next) => {
  EnrolledClass.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Enrolled class deleted."))
    .catch(next);
});

module.exports = router;
