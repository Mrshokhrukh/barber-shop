import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [registeredUser, setRegisteredUser] = useState({});

  const handleChange = (e) => {
    setRegisteredUser({ ...registeredUser, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post("http://127.0.0.1:8000/register", registeredUser).then((res) => {
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
    </>
  );
};

export default Register;
