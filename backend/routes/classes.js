const router = require("express").Router();
let Class = require("../models/class.model");

router.route("/").get((req, res, next) => {
  Class.find()
    .then((classes) => res.status(200).send(classes))
    .catch(next);
});

router.route("/create").post((req, res, next) => {
  let className = req.body.className;
  let section = req.body.section;
  let subject = req.body.subject;
  let room = req.body.room;
  let joinCode = req.body.joinCode;
  let user = req.body.user;

  const newClass = new Class({
    className,
    section,
    subject,
    room,
    joinCode,
    user,
  });

  newClass
    .save()
    .then((createdClass) => res.status(200).send(createdClass))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  Class.findById(req.params.id)
    .then((class_details) => res.status(200).send(class_details))
    .catch(next);
});

router.route("/detail-by-class-code/:id").get((req, res, next) => {
  let joinCode = req.params.id;

  Class.findOne({ joinCode }).exec((err, class_details) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    return res.status(200).send(class_details);
  });
});

router.route("/:id").delete((req, res, next) => {
  Class.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Class deleted."))
    .catch(next);
});

module.exports = router;
