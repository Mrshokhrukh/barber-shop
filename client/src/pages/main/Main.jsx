import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";
import "./style.scss";
const Main = () => {
  let mainApp = useRef();
  const [isOpen, setIsOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
      if (width < 769 && true) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [width]);

  const openSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="main-app-wrapper">
      <div className="main-app-header">
        <button onClick={openSidebar}>open</button>
      </div>
      <div className="main-app">
        <Sidebar isOpen={isOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
