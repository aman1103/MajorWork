import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const [state, updateState] = useState([]);
  const forceUpdate = useCallback(() => updateState({}), []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (localStorage.getItem("isTeacher") === "false") {
      navigate("/student");
    }
  }, [state]);
  return (
    <>
      <Typography variant="h3">Welcome Teacher</Typography>
    </>
  );
};

export default Teacher;
