import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiURL from "../../http";

const Register = () => {
  const [registeredUser, setRegisteredUser] = useState({});

  const handleChange = (e) => {
    setRegisteredUser({ ...registeredUser, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${apiURL}/register`, registeredUser, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }

    setRegisteredUser({});
  };
  return (
    <div className="register">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={registeredUser.name || ""}
          onChange={handleChange}
          placeholder="first name"
        />
        <input
          type="email"
          name="email"
          value={registeredUser.email || ""}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={registeredUser.password || ""}
          onChange={handleChange}
          placeholder="password"
        />
        <input
          type="password"
          name="confirm_password"
          value={registeredUser.confirm_password || ""}
          onChange={handleChange}
          placeholder="confirm password"
        />
        <button>submit</button>
      </form>
      <Link to="/auth/verify">Verify</Link>
    </div>
  );
};

export default Register;
