import React, { useRef } from "react";

const Verify = () => {
    let ref = useRef()

  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="verify">
      <form onSubmit={submit}>
        
        <input type="number" placeholder="verification code" />

        <button>verify</button>
      </form>
    </div>
  );
};

export default Verify;
