import React from "react";
import { Link } from "react-router-dom";
import "./welcome.scss";
const NavigateServices = () => {
  return (
    <Link to="/uz/barbershop/services">
      <div className="welcome">Hizmatlar bilan tanishish</div>
    </Link>
  );
};

export default NavigateServices;
