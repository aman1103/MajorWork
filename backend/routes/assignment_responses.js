const router = require("express").Router();
const lodash = require("lodash");
let AssignmentResponse = require("../models/assignment_response.model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "../uploads/",
  filename: function (_req, file, cb) {
    console.log(file);
    cb(null, "RESPONSE_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

router.route("/").get((req, res, next) => {
  let query_param = req.query;

  // check for query parameters
  if (!lodash.isEmpty(query_param)) {
    if (query_param.userId) {
      // if we're querying using the user ID, then find responses using the user ID
      let userId = query_param.userId;
      let assignment_id = query_param.assignment_id;
      AssignmentResponse.findOne({ userId, assignment_Id })
        .then((assignment_responses) =>
          res.status(200).json(assignment_responses)
        )
        .catch(next);
    } else if (query_param.assignment_id) {
      // if we're querying using the assignment ID, then find responses using the assignment ID
      let assignment_id = query_param.assignment_id;
      AssignmentResponse.find({ assignment_id })
        .then((assignment_responses) =>
          res.status(200).send(assignment_responses)
        )
        .catch(next);
    } else {
      // if any other query param is used, then just return all responses
      AssignmentResponse.find()
        .then((assignment_responses) =>
          res.status(200).send(assignment_responses)
        )
        .catch(next);
    }
  } else {
    // if no query param is used, then just return all responses
    AssignmentResponse.find()
      .then((assignment_responses) =>
        res.status(200).send(assignment_responses)
      )
      .catch(next);
  }
});

router.route("/").post((req, res) => {
  const path = "../uploads/" + req.body.fileurl;
  res.download(path);
});
router.route("/create").post(upload.single("file"), (req, res, next) => {
  let assignmentFileUrl = req.body.assignmentFileUrl;
  // let marks = req.body.marks;
  // let name = req.body.name;
  // let type = req.body.type;
  let userId = req.body.userId;
  let assignment_id = req.body.assignment_id;

  const newAssignmentResponse = new AssignmentResponse({
    assignmentFileUrl: "RESPONSE_" + assignmentFileUrl,
    // marks,
    // name,
    // type,
    userId,
    assignment_id,
  });

  // save details using mongoose model
  newAssignmentResponse
    .save()
    .then((createdAssignmentResponse) =>
      res.status(200).send(createdAssignmentResponse)
    )
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  // Find a assigment response using the ID
  AssignmentResponse.findById(req.params.id)
    .then((assignmentresponse_details) =>
      res.status(200).send(assignmentresponse_details)
    )
    .catch(next);
});

router.route("/update/:id").patch((req, res, next) => {
  console.log(req.body);

  // Find assignment responses using the ID
  AssignmentResponse.findById(req.params.id)
    .then((assignment_response_details) => {
      // Update marks
      assignment_response_details.marks = req.body.marks;

      // save details using mongoose model
      assignment_response_details
        .save()
        .then((updatedAssignmentResponse) =>
          res.status(200).send(updatedAssignmentResponse)
        )
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
