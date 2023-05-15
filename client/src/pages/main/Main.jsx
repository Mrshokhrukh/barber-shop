import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";

import "./style.scss";
import Header from "../../components/header/Header";
const Main = () => {
  let isOutOfWidth = useRef(false);
  const inOpenSidebar = useRef("");
  const [isOpen, setIsOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

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
      <div className={isOpen ? inOpenSidebar.current : ""} onClick={() => setIsOpen(false)}></div>
      <Header openSidebar={openSidebar} />
      <div className="main-app">
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
