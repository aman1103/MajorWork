import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const SignUp = () => {

  const navigate = useNavigate();
  const universityId = uuid();

  // First Name Variables
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);


  // Last Name Variables
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);


  //Email Variables
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  // Is teacher Variable
  const [isTeacher, setIsTeacher] = useState(false);


  //Password Variables
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);


  //Matching Password Variables
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);


  //Error Messages Variables
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);


  // Validating First Name
  useEffect(() => {
    const result = USER_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
    setValidFirstName(result);
  }, [firstName]);


  //Validating Last Name
  useEffect(() => {
    const result = USER_REGEX.test(lastName);
    console.log(result);
    console.log(lastName);
    setValidLastName(result);
  }, [lastName]);


  //Validating Email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  //Validating Passowrd and matching Password
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword])
  

  //Updating the error message
  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, password, matchPassword]);


  // Handling login click
  const handleLogin = async () => {
    const user = {
      "fullName": firstName + " " + lastName,
      "email": email,
      "isTeacher": isTeacher,
      "password": password,
      "universityId": universityId
    }
    const response = await axios.post(
      "http://localhost:4000/users/signup",
      user
    );
    console.log(response);
  };

  const handleRedirection = () => {
    
    navigate({
      pathname:"/signin"
    });
  }

  return (
    <>
      <h1>Sign Up</h1>
      <br />
      <br />
      <label>
        First Name :
        <input
          required
          placeholder="First Name"
          type="text"
          autoComplete="off"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </label>


      <br />
      <br />


      <label>
        Last Name :
        <input
          required
          placeholder="Last Name"
          type="text"
          autoComplete="off"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </label>


      <br />
      <br />


      <label>
        Email :
        <input
          required
          placeholder="Email"
          type="text"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>


      <br />
      <br />


      <label>
        Password :
        <input
          required
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>


      <br />
      <br />


      <label>
        Confirm Password :
        <input
          required
          type="password"
          value={matchPassword}
          onChange={(e) => {
            setMatchPassword(e.target.value);
          }}
        />
      </label>


      <br />
      <br />


      <label>
        Is a teacher :
        <input
          type="checkbox"
          onChange={() => setIsTeacher(!isTeacher)}
        ></input>
      </label>


      <br />
      <br />


      <button
        disabled={!validFirstName || !validLastName || !validEmail ||  !validPassword || !validMatchPassword ? true:false}
        onClick={handleLogin}
      >
        Sign Up
      </button>
      <p> Already Registered?</p>
      <br />
      <button onClick={handleRedirection}> Sign In</button>
    </>
  );
};

export default SignUp;
