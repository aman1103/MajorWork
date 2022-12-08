//@ts-noCheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Button } from "@mui/material";
import CreateAssignment from "./CreateAssignment";
import AssignmentTable from "./AssignmentTable";
import AssignmentTableStudent from "./AssignmentTableStudent";

function Assignment() {
  const [assignments, setAssignments] = useState();
  const className = localStorage.getItem("className");
  const isTeacher = localStorage.getItem("isTeacher");
  const navigate = useNavigate();

  const getAssignments = async () => {
    const res = await axios.get("http://localhost:4000/assignments");
    console.log(res.data);
    setAssignments(res.data);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate({
        pathname: "/",
      });
    }
    getAssignments();
  }, []);
  return (
    <>
      <NavBar />
      <br />
      {isTeacher === true && (
        <Button sx={{ marginLeft: "10px" }} variant="contained">
          <CreateAssignment className={className} />
        </Button>
      )}
      <br />
      {assignments !== undefined && isTeacher === "true" && (
        <AssignmentTable assignments={assignments} />
      )}
      {assignments !== undefined && isTeacher === "false" && (
        <AssignmentTableStudent assignments={assignments} />
      )}
    </>
  );
}

export default Assignment;
