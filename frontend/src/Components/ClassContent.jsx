import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

const Class = () => {
  const location = useLocation();
  const className = location.state.className;
  return (
    <>
      <NavBar className={className} />
    </>
  );
};

export default Class;
