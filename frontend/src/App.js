//@ts-noCheck

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState();
  const [marks, setMarks] = useState(0);
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost/4000/assignment/upload", {
        name: name,
        marks: marks,
        assignment: file,
        startingDate: startingDate,
        dueDate: dueDate,
      });
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

export default App;
