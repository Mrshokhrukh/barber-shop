import axios from "axios";
import React, { useRef, useState } from "react";

const Verify = () => {
  const [verify, setVerify] = useState({});

  const change = (e) => {
    setVerify({ ...verify, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://server-1-x7613193.deta.app/activate-email", verify)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
