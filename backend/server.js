const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const Assignment = require("./models/Assignment.models");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/lms";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected to MongoDB successfully!");
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (_req, file, cb) {
    cb(null, "FILE_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

app.post("/assignment/upload", upload.single("file"), (req, res) => {
  const assignment = new Assignment({
    title: req.body.name,
    assignmentFileUrl: "FILE_" + Date.now() + path.extname(req.body.filename),
    assignmentMarks: req.body.marks,
    startingDate: req.body.startingDate,
    dueDate: req.body.dueDate,
  });
  console.log(assignment);
  assignment.save();
  res.status(200);
});

app.get("/assignment/view", (_req, res) => {
  console.log("called view assignment");
  let a = [];
  Assignment.find()
    .exec()
    .then((assignments) =>
      assignments.map((obj) => {
        a.push(obj);
      })
    )
    .catch((err) => console.log(err));
  console.log(a);
  res.send(a);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
