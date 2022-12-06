import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Button, TextField, Alert } from "@mui/material";

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const SignIn = () => {
  const navigate = useNavigate();

  //Email Variables
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  //Password Variables
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  //Error Messages Variables
  const [errMsg, setErrMsg] = useState("");

  //Validating Email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
    if (result === false) {
      setErrMsg("Not a valid email");
    } else {
      setErrMsg("");
    }
  }, [email]);

  //Validating Passowrd
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    if (result === false) {
      setErrMsg(
        "Password must contain an uppercase, lowercase and a special character and must be between 8-24 characters long"
      );
    } else {
      setErrMsg("");
    }
  }, [password]);
  useEffect(() => {
    setErrMsg("");
    if (localStorage.getItem("token")) {
      const isTeacher = localStorage.getItem("isTeacher") === "true";
      console.log(isTeacher);
      if (isTeacher) {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    }
  }, []);

  // Handling login click
  const handleLogin = async () => {
    setErrMsg("");
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/users/signin",
        user
      );
      const data = response.data;
      console.log(data);
      localStorage.setItem("email", data.email);
      localStorage.setItem("isTeacher", data.isTeacher);
      localStorage.setItem("token", data.token);
      localStorage.setItem("universityId", data.universityId);
      if (data.isTeacher) {
        navigate("/teacher");
      } else {
        navigate("student");
      }
    } catch (err) {
      setErrMsg(err.response.data.error);
    }
  };

  const handleRedirection = () => {
    navigate({
      pathname: "/signup",
    });
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Sign In
          </Typography>
        </Grid>
        {errMsg !== "" && (
          <Grid item xs={12}>
            <Alert severity="error">
              <p>{errMsg}</p>
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            type="text"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={!validEmail || !validPassword ? true : false}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6"> Don't have an account</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleRedirection}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
