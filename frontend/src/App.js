//@ts-noCheck

import axios from "axios";
import React, { useState } from "react";
import Assignment from "./Components/Assignment";

function App() {
  const [assignments, setAssignments] = useState();

  const hanldeViewAssignments = async () => {
    let tempStore = await axios.get("http://localhost:4000/assignment/view");
    tempStore = tempStore.response.data;
    setAssignments(tempStore);
    console.log(assignments);
  };

  const handleSingleAssignment = async () => {
    await axios.get("http://localhost:4000/assignment/view");
  };

  return (
    <>
      <button onClick={hanldeViewAssignments}>View Assignments</button>
      {/* <Assignment /> */}
    </>
  );
}

export default App;
