import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiURL from "../../http";
import "./auth.scss";
const Login = () => {
  let navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({});

  const change = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post(`${apiURL}/login`, loginUser, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then((response) => {
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.access_token)
        );
        if (response.data) {
          navigate("/uz/barbershop/services");
        } else if (response.data.is_admin) {
          navigate("/admin/dashboard");
        } else {
          console.log("user");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });
    setLoginUser({});
  };
  return (
    <div className="login">
      <form onSubmit={Submit}>
        <div className="form-email">
          <label htmlFor="email">Email </label>
          <input
            id="email"
            type="email"
            name="email"
            value={loginUser.email || ""}
            onChange={change}
          />
        </div>
        <div className="form-password">
          <label htmlFor="password">password </label>
          <input
            id="password"
            type="text"
            name="password"
            value={loginUser.password || ""}
            onChange={change}
          />
        </div>
        <button className="submit-button">submit</button>
      </form>
    </div>
  );
};

export default Login;
