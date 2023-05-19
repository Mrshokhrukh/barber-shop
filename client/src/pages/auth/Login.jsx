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
      .post(`${apiURL}/login`, loginUser)
      .then((response) => {
        if (response.data.is_admin) {
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
        <input
          type="text"
          name="email"
          value={loginUser.email || ""}
          onChange={change}
          placeholder="email"
        />

        <input
          type="text"
          name="password"
          value={loginUser.password || ""}
          onChange={change}
          placeholder="password"
        />
        <button>submit</button>
      </form>
      <Link to="/uz/barbershop/auth/register">Register</Link>
    </div>
  );
};

export default Login;
