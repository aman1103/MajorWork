import { Typography } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <Typography variant="h3">Welcome Student</Typography>
    </>
  );
};

export default Student;
