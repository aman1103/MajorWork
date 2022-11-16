const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/assignment/upload", (_req, res) => {
  res.json({ name: "Aman" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
