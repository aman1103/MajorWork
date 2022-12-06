import { Typography } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";

const Student = () => {
  const [state, updateState] = useState([]);
  const forceUpdate = useCallback(() => updateState({}), []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (localStorage.getItem("isTeacher") === "true") {
      navigate("/teacher");
    }
  }, [state]);
  return (
    <>
      <NavBar2 />
      <Typography variant="h3">Welcome Student</Typography>
    </>
  );
};

export default Student;
