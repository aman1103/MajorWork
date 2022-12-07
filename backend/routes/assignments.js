const router = require("express").Router();
const lodash = require("lodash");
let Assignment = require("../models/assignment.model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "../uploads/",
  filename: function (_req, file, cb) {
    cb(null, "FILE_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

router.route("/").get((req, res, next) => {
  let query_param = req.query;
  if (!lodash.isEmpty(query_param)) {
    if (query_param.classId) {
      // if we're querying using the class ID, then find assignments using the class ID
      let classId = query_param.classId;
      Assignment.find({ classId })
        .then((assignments) => res.status(200).send(assignments))
        .catch(next);
    } else {
      // if any other query param is used, then just return all responses
      Assignment.find()
        .then((assignments) =>
          res.status(200).json({ assignments: assignments })
        )
        .catch(next);
    }
  } else {
    // if no query param is used, then just return all responses
    Assignment.find()
      .then((assignments) => res.status(200).send(assignments))
      .catch(next);
  }
});

// router.route("/create").post((req, res, next) => {
//   let title = req.body.title;
//   let instruction = req.body.instruction;
//   let assignmentFileUrl = req.body.assignmentFileUrl;
//   let assignmentMarks = req.body.assignmentMarks;
//   let name = req.body.name;
//   let type = req.body.type;
//   let startingDate = req.body.startingDate;
//   let dueDate = req.body.dueDate;
//   let authorId = req.body.authorId;
//   let classId = req.body.classId;

//   const newAssignment = new Assignment({
//     title,
//     instruction,
//     assignmentFileUrl,
//     assignmentMarks,
//     name,
//     type,
//     startingDate,
//     dueDate,
//     authorId,
//     classId,
//   });

//   // save details using mongoose model
//   newAssignment
//     .save()
//     .then((createdAssignment) => res.status(200).send(createdAssignment))
//     .catch(next);
// });

router.route("/create").post(upload.single("file"), (req, res) => {
  const { name, filename, marks, startingDate, dueDate, authorId, classId } =
    req.body;
  const assignment = new Assignment({
    title: name,
    assignmentFileUrl: "FILE_" + Date.now() + path.extname(filename),
    assignmentMarks: marks,
    startingDate: startingDate,
    dueDate: dueDate,
    authorId: authorId,
    classId: classId,
  });
  console.log(assignment);
  assignment.save();
  res.status(200);
});

router.route("/:id").get((req, res, next) => {
  // Find an assigment using the ID
  Assignment.findById(req.params.id)
    .then((assignment_details) => res.status(200).send(assignment_details))
    .catch(next);
});

router.route("/update/:id").patch((req, res, next) => {
  // Find assignment using the ID
  Assignment.findById(req.params.id)
    .then((assignment_details) => {
      // Update marks
      assignment_details.assignmentMarks = req.body.assignmentMarks;

      // save details using mongoose model
      assignment_details
        .save()
        .then((updatedAssignment) => res.status(200).send(updatedAssignment))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
