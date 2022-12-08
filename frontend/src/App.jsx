//@ts-noCheck

import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Teacher from "./Components/Teacher";
import Student from "./Components/Student";
import ClassContent from "./Components/ClassContent";
import Assignment from "./Components/Assignment";
import ViewAssignment from "./Components/ViewAssignment";
import Quiz from "./Components/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/teacher" element={<Teacher />}></Route>
      <Route path="/student" element={<Student />}></Route>
      <Route path="/class" element={<ClassContent />}></Route>
      <Route path="/assignment" element={<Assignment />}></Route>
      <Route path="/viewAssignments" element={<ViewAssignment />}></Route>
      <Route path="/quiz" element={<Quiz />}></Route>
    </Routes>
  );
}

export default App;
