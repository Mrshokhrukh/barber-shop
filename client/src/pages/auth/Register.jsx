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
        <div>
          <label htmlFor="name">name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={registeredUser.name || ""}
            onChange={handleChange}
            placeholder="first name"
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={registeredUser.email || ""}
            onChange={handleChange}
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={registeredUser.password || ""}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
        <div>
          <label htmlFor="confirm_pass">confirm </label>
          <input
            id="confirm_pass"
            type="password"
            name="confirm_password"
            value={registeredUser.confirm_password || ""}
            onChange={handleChange}
            placeholder="confirm password"
          />
        </div>
        <button className="submit-button">submit</button>
      </form>
    </div>
  );
};

export default Register;
