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
          name="first_name"
          value={registeredUser.first_name || ""}
          onChange={handleChange}
          placeholder="first name"
        />
        <input
          type="text"
          name="last_name"
          value={registeredUser.last_name || ""}
          onChange={handleChange}
          placeholder="last name"
        />
        <input
          type="text"
          name="phone"
          value={registeredUser.phone || ""}
          onChange={handleChange}
          placeholder="phone"
        />
        <button>submit</button>
      </form>
    </>
  );
};

export default Register;
