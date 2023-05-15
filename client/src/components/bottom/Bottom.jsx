import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./bottom.scss";
const Bottom = ({ checkStorage, checkedServices }) => {
  let navigate = useNavigate();
  const handleNavigate = () => {
    if (checkedServices.length > 0) {
      navigate("/uz/barbershop/master-and-date");
    } else {
      console.log("serivice tanlang");
    }
  };

  const goToMasters = () => {
    navigate("/uz/barbershop/masters");
  };
  return (
    <div className="bottom-link">
      <button disabled={checkedServices.length > 0 ? false : true}>
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
