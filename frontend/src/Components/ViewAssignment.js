//@ts-noCheck

import axios from "axios";
import React, { useState } from "react";
import fileDownload from "js-file-download";

function ViewAssignment() {
  const [assignments, setAssignments] = useState([]);

  const hanldeViewAssignments = async () => {
    let tempStore = await axios.get("http://localhost:4000/assignment/view");
    console.log(tempStore.data.assignment);
    setAssignments(tempStore.data.assignment);
    console.log(assignments);
  };

  const handleSingleAssignment = async (fileUrl) => {
    const response = await axios.post(
      `http://localhost:4000/assignment/view`,
      {
        fileurl: fileUrl,
      },
      {
        responseType: "blob",
      }
    );
    fileDownload(response.data, fileUrl);
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
          </li>
        );
      })}
    </>
  );
}

export default ViewAssignment;
