import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./bottom.scss";
import { BsArrowRightCircle } from "react-icons/bs";
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
          <p onClick={handleNavigate}>Vaqt tanlash <BsArrowRightCircle className="rightCircle-icon"/></p>
        ) : (
          <p onClick={goToMasters}>Master tanlash <BsArrowRightCircle className="rightCircle-icon"/></p>
        )}
      </button>
    </div>
  );
};

export default Bottom;
