import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiURL from "../../http";
const Login = () => {
  let navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({});

  const change = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const Submit = async (e) => {
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
          name="phone"
          value={loginUser.email || ""}
          onChange={change}
          placeholder="phone number"
        />

        <input
          type="text"
          name="code"
          value={loginUser.username || ""}
          onChange={change}
          placeholder="verify code"
        />
        <button>submit</button>
      </form>
      <Link to="/auth/register">Register</Link>
    </div>
  );
};

export default Login;
