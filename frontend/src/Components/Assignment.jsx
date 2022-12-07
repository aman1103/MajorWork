//@ts-noCheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Button } from "@mui/material";
import CreateAssignment from "./CreateAssignment";
import AssignmentTable from "./AssignmentTable";

function Assignment() {
  const location = useLocation();
  const [assignments, setAssignments] = useState();
  const className = location.state.className;
  const navigate = useNavigate();

  const getAssignments = async () => {
    const res = await axios.get("http://localhost:4000/assignments");
    console.log(res.data);
    setAssignments(res.data);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const isTeacher = localStorage.getItem("isTeacher");
      if (!isTeacher) {
        navigate({
          pathname: "/student",
        });
      }
    } else {
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
      <Button sx={{ marginLeft: "10px" }} variant="contained">
        <CreateAssignment className={className} />
      </Button>
      <br />
      {assignments !== undefined && (
        <AssignmentTable assignments={assignments} />
      )}
    </>
  );
}

export default Assignment;
