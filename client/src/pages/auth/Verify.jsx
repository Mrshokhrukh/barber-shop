import axios from "axios";
import React, { useRef } from "react";

const Verify = () => {
  let ref = useRef();

  const change = (e) => {};

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/activate-email", {})
      .then((res) => {
        ref = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        
      });
  };
  return (
    <div className="verify">
      <form onSubmit={submit}>
        <input type="email" name="email" onChange={change} placeholder="email" />
        <input type="number" name="code" onChange={change} placeholder="verification code" />
        <button>verify</button>
      </form>
    </div>
  );
};

export default Verify;
