const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
