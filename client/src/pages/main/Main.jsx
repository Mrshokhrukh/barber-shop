import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";

import "./style.scss";
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
      } else {
        isOutOfWidth.current = true;
      }
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [width]);

  const openSidebar = () => {
    setIsOpen(!isOpen);
    inOpenSidebar.current = "inSidebarOpen";
  };
  const closeSidebar = (p) => {
    setIsOpen(p);
    inOpenSidebar.current = "";
  };

  return (
    <div className="main-app-wrapper">
      <div className={inOpenSidebar.current}></div>
      <div className="main-app-header">
        <button onClick={openSidebar}>open</button>
      </div>
      <div className="main-app">
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
