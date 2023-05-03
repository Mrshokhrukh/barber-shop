import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Login from "../auth/Login";
import "./style.scss";
const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="main-app">
      <Sidebar isOpen={isOpen} />
      <Outlet />
    </div>
  );
};

export default Main;
