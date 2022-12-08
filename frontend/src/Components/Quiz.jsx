//@ts-noCheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Button } from "@mui/material";
function Quiz() {
  const navigate = useNavigate();

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
  }, []);

  const handleClick = () => {
    navigate({ pathname: "/createquiz" });
  };
  return (
    <>
      <NavBar />
      <br />
      <Button
        onClick={handleClick}
        sx={{ marginLeft: "10px" }}
        variant="contained"
      >
        Create Quiz
      </Button>
    </>
  );
}

export default Quiz;
