import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiURL from "../../http";

const Verify = () => {
  const [verify, setVerify] = useState({});
  let navigate = useNavigate();
  const change = (e) => {
    setVerify({ ...verify, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/activate-email`, verify, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        navigate("/uz/barbershop");
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.data);
        }
      });
  };
  return (
    <div className="verify">
      <form onSubmit={submit}>
        <input
          type="email"
          value={verify.email || ""}
          name="email"
          onChange={change}
          placeholder="email"
        />
        <input
          type="number"
          value={verify.code || ""}
          name="code"
          onChange={change}
          placeholder="verification code"
        />
        <button>verify</button>
      </form>
    </div>
  );
};

export default Verify;
