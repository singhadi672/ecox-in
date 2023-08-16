import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import "./login.css";

export function Login() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { loginUserWithCredentials, login } = useAuth();

  useEffect(() => {
    login && navigate("../");
    // eslint-disable-next-line
  }, []);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(false);

  async function loginUserHandler() {
    if (emailRef.current.value && passwordRef.current.value) {
      setLoginError(false);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const response = await loginUserWithCredentials(email, password);
      if (response && response.data.status) {
        navigate(state ? `../${state?.from}` : "../");
      } else {
        setLoginError(true);
      }
    } else {
      setLoginError(true);
    }
  }

  return (
    <div className="login">
      <div className="login-section login-left">
        <div className="heading-mobile">
          <h1>Ecox.in</h1>
        </div>
        <h1 className="login-header">Login </h1>
        <div className="login-form">
          {loginError && (
            <small style={{ color: "red" }}>incorrect username/password!</small>
          )}
          <div className="email">
            <label htmlFor="user-email">Email*</label>
            <input
              type="email"
              name="user-email"
              ref={emailRef}
              required
              placeholder="mail@website.com"
            />
          </div>
          <div className="password">
            <label htmlFor="user-password">Password*</label>
            <input
              type="password"
              name="user-password"
              ref={passwordRef}
              required
              placeholder="password"
            />
          </div>
          <button className="login-btn" onClick={loginUserHandler}>
            Login
          </button>
          <h5>
            Not a member yet?{" "}
            <span className="sign-up" onClick={() => navigate("../signup")}>
              {" "}
              Sign Up!
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
