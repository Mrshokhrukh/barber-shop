import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

import "./style.scss";
const Main = () => {
  let isOutOfWidth = useRef(false);
  const inOpenSidebar = useRef("");
  const [isOpen, setIsOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  let navigate = useNavigate();
  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
      if (width < 769) {
        isOutOfWidth.current = false;
        if (setIsOpen) {
          inOpenSidebar.current = "inSidebarOpen";
        } else {
          inOpenSidebar.current = "";
        }
      } else {
        isOutOfWidth.current = true;
        setIsOpen(true);
        inOpenSidebar.current = "";
      }
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [width]);

  const openSidebar = () => {
    setIsOpen(!isOpen);
    if (setIsOpen) {
      inOpenSidebar.current = "inSidebarOpen";
    }
  };
  const closeSidebar = (p) => {
    setIsOpen(p);
    inOpenSidebar.current = "";
  };

  return (
    <div className="main-app-wrapper">
      <div className={isOpen ? inOpenSidebar.current : ""}></div>
      <div className="main-app-header">
        <button onClick={openSidebar}>
          <GiHamburgerMenu className="icon" />
        </button>
        <div className="head-text">
          <p>BARBERSHOP ELEVEN </p> <span>SERVICE SELECTION</span>
        </div>
        <button onClick={() => navigate("/")}>
          <IoClose className="icon" />
        </button>
      </div>
      <div className="main-app">
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
