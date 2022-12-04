/* eslint-disable jsx-a11y/anchor-is-valid */
//@ts-noCheck

import axios from "axios";
import React, { useState } from "react";
import fileDownload from "js-file-download";

function ViewAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [responseFile, setResponseFile] = useState();

  const hanldeViewAssignments = async () => {
    let tempStore = await axios.get("http://localhost:4000/assignments");
    console.log(tempStore.data.assignment);
    setAssignments(tempStore.data.assignment);
    console.log(assignments);
  };

  const handleSingleAssignment = async (fileUrl) => {
    const response = await axios.post(
      `http://localhost:4000/assignments`,
      {
        fileurl: fileUrl,
      },
      {
        responseType: "blob",
      }
    );
    fileDownload(response.data, fileUrl);
  };

  const handleSubmit = async (fileUrl) => {
    console.log(responseFile);
    const formData = new FormData();
    formData.append("file", responseFile);
    formData.append("assignmentFile", fileUrl);
    formData.append();
    console.log(formData);
    try {
      await axios.post("http://localhost:4000/assignments/upload", formData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={hanldeViewAssignments}>View Assignments</button>
      <br />
      <br />
      {assignments.map((value, idx) => {
        return (
          <li key={idx}>
            <a
              href="#"
              onClick={() => {
                handleSingleAssignment(value.assignmentFileUrl);
              }}
            >
              {value.title}
            </a>
            <br />
            <input
              type="file"
              name="file"
              onChange={(e) => {
                setResponseFile(e.target.files[0]);
              }}
            />
            <br />
            <button onClick={handleSubmit(value.assignmentFileUrl)}>
              Submit Response
            </button>
            <br />
            <br />
          </li>
        );
      })}
    </>
  );
}

export default ViewAssignment;
