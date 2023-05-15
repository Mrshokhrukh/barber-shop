import React from "react";
import { Link } from "react-router-dom";
import "./welcome.scss";
import { BsArrowRightCircle } from "react-icons/bs";
const NavigateServices = () => {
  return (
    <Link to="/uz/barbershop/services" className="navigateToServices">
      <p className="welcome-text">Hizmatlar bilan tanishish</p>
      <BsArrowRightCircle className="right-icon" />
    </Link>
  );
};

export default NavigateServices;
