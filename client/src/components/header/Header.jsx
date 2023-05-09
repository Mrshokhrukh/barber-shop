import React from "react";
import "./header.scss";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  let navigate = useNavigate();
  return (
    <div className="fixed_header">
      <div className="main-app-header">
        <button onClick={() => props.openSidebar()}>
          <GiHamburgerMenu className="icon" />
        </button>
        <div className="head-text">
          <p>BARBERSHOP ELEVEN </p> <span>SERVICE SELECTION</span>
        </div>
        <button onClick={() => navigate("/")}>
          <IoClose className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
