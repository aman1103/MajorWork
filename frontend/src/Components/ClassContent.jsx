import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const Class = () => {
  const location = useLocation();
  const className = location.state.className;
  console.log(className);
  return (
    <>
      <NavBar className={className} />
      <br />
      <Typography variant="h3">{className} Class</Typography>
    </>
  );
};

export default Class;
