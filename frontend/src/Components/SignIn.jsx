import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [success, setSuccess] = useState(false);

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
  }, []);

  // Handling login click
  const handleLogin = async () => {
    setErrMsg("");
    setSuccess(false);
    const user = {
      email: email,
      password: password,
    };
    try {
      await axios.post("http://localhost:4000/users/signin", user);
      setEmail("");
      setPassword("");
      setSuccess(true);
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
      <h1>Sign In</h1>
      <br />
      <br />
      {errMsg !== "" && <p>{errMsg}</p>}
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

      <button
        disabled={!validEmail || !validPassword ? true : false}
        onClick={handleLogin}
      >
        Sign In
      </button>
      <p> Don't have an account</p>
      <br />
      <button onClick={handleRedirection}> Sign Up</button>
      {success && <p>Check email for verification</p>}
    </>
  );
};

export default SignIn;
