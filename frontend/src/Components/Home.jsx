import axios from "axios";
import React, { useEffect, useState } from "react";
import DiffNavBar from "./DiffNavBar";

const Home = () => {
  const [courses, setCourses] = useState();
  useEffect(async () => {
    try {
      const res = await axios.post("http://localhost:4000/users/");
      const user = res.data.user;
      const courses = await axios.post(
        "http:/localhost:4000/enrolled_classes/"
      );
      setCourses(courses);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <DiffNavBar />
      <br />
      {/* {courses.map((course) => {
        <MenuItem
          key={course.name}
          onClick={() => {
            handleMenu(course.link);
          }}
        >
          <Typography textAlign="center">{course.name}</Typography>
        </MenuItem>;
      })} */}
    </>
  );
};

export default Home;
