//@ts-noCheck

import React, { useState } from "react";
import axios from "axios";

function Assignment() {
  const [name, setName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState();
  const [marks, setMarks] = useState(0);
  const handleSubmit = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("filename", file.name);
    formData.append("name", name);
    formData.append("marks", marks);
    formData.append("file", file);
    formData.append("startingDate", startingDate);
    formData.append("dueDate", dueDate);
    console.log(formData);
    try {
      await axios.post("http://localhost:4000/assignment/upload", formData);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <br />
      <br />
      <input
        placeholder="0"
        type="number"
        value={marks}
        onChange={(e) => {
          setMarks(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="date"
        value={startingDate}
        onChange={(e) => {
          setStartingDate(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => {
          setDueDate(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default Assignment;
