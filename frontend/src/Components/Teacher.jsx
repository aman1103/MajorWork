import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
import ClassCard from "./ClassCard";
import axios from "axios";
import { Grid } from "@mui/material";

const Teacher = () => {
  const [state, updateState] = useState([]);
  const [createdClasses, setCreatedClasses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (localStorage.getItem("isTeacher") === "false") {
      navigate("/student");
    }
  }, [state]);

  const fetchClasses = async () => {
    const universityId = localStorage.getItem("universityId");
    console.log(universityId);

    const response = await axios.post("http://localhost:4000/classes", {
      user: universityId,
    });
    console.log(response);
    setCreatedClasses(response.data);
  };
  useEffect(() => {
    fetchClasses();
  }, []);
  return (
    <>
      <NavBar2 />
      <br />
      <Grid container spacing={1}>
        {createdClasses.map((cls) => {
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

export default Teacher;
