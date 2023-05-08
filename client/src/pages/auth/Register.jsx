import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [registeredUser, setRegisteredUser] = useState({});

  const handleChange = (e) => {
    setRegisteredUser({ ...registeredUser, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      axios
        .post("https://server-1-x7613193.deta.app/register", registeredUser, {
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
    <>
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
        <button>submit</button>
      </form>
      <Link to="/auth/verify">Verify</Link>
    </>
  );
};

export default Register;
