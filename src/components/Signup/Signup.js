import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import "./signup.css";

export function Signup() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { login, signupUser } = useAuth();
  const [signupError, setSignupError] = useState({
    status: false,
    message: "",
  });

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    login && navigate("../");
    // eslint-disable-next-line
  }, []);

  async function signupHandler() {
    if (
      emailRef.current.value &&
      usernameRef.current.value &&
      passwordRef.current.value
    ) {
      setSignupError({ ...signupError, status: false });
      const email = emailRef.current.value;
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      const response = await signupUser(username, email, password);
      if (response && response.data.status) {
        navigate(state ? `../${state?.from}` : "../");
      } else {
        setSignupError({
          ...signupError,
          status: true,
          message: "user already present!",
        });
      }
    } else {
      setSignupError({
        ...signupError,
        status: true,
        message: "please fill up mandatory fields!",
      });
    }
  }

  return (
    <div className="login">
      <div className="login-section login-left">
        <div className="heading-mobile">
          <h1>Ecox.in</h1>
        </div>
        <h1 className="login-header">Sign-up</h1>
        <div className="login-form">
          {signupError.status && (
            <small style={{ color: "red" }}>{signupError.message}</small>
          )}
          <div className="username">
            <label htmlFor="username">Name*</label>
            <input
              type="text"
              name="username"
              ref={usernameRef}
              required
              placeholder="max. 25 characters"
              maxLength={25}
            />
          </div>
          <div className="email">
            <label htmlFor="user-email">Email*</label>
            <input
              type="email"
              name="user-email"
              required
              ref={emailRef}
              placeholder="mail@website.com"
            />
          </div>
          <div className="password">
            <label htmlFor="user-password">Password*</label>
            <input
              type="password"
              name="user-password"
              required
              ref={passwordRef}
              placeholder="password"
            />
          </div>
          <button className="login-btn" onClick={signupHandler}>
            Sign up
          </button>
          <h5>
            Already a member?
            <span className="sign-up" onClick={() => navigate("../login")}>
              Login!
            </span>
          </h5>
        </div>
      </div>
      <div className="login-section login-right">
        <h1>Ecox.in</h1>
        <h3>Buy Premium Travel Accessories</h3>
      </div>
    </div>
  );
}
