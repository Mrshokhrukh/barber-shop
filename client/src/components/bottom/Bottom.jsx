import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./bottom.scss";
const Bottom = ({ checkStorage, checkedServices }) => {
  let buttonRef = useRef(null);
  let navigate = useNavigate();
  const handleNavigate = () => {
    if (!buttonRef.current.disabled) {
      navigate("/uz/barbershop/master-and-date");
    } else {
      console.log("serivice tanlang");
    }
  };

  const goToMasters = () => {
    if (buttonRef.current.disabled) {
    } else {
      navigate("/uz/barbershop/masters");
    }
  };
  return (
    <div className="bottom-link">
      <button disabled={checkedServices.length > 0 ? false : true} ref={buttonRef}>
        {checkStorage ? (
          <p onClick={handleNavigate}>Link to timing</p>
        ) : (
          <p onClick={goToMasters}>Link to masters</p>
        )}
      </button>
    </div>
  );
};

export default Bottom;
