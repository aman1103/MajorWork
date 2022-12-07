import { stepClasses, Typography, Grid } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
import axios from "axios";
import ClassCard from "./ClassCard";

const Student = () => {
  const [state, updateState] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
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

  const fetchClasses = async () => {
    const userId = localStorage.getItem("universityId");
    try {
      const res = await axios.get(
        `http://localhost:4000/enrolled_classes?userId=${userId}`
      );
      console.log(res.data);
      setEnrolledClasses(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);
  return (
    <>
      <NavBar2 />
      <br />
      <Grid container spacing={1}>
        {enrolledClasses.map((cls) => {
          return (
            <Grid item xs={3}>
              <ClassCard cls={cls} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Student;
