import React, { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BiChevronsRight } from "react-icons/bi";
const Auth = () => {
  return (
    <div className="authentication">
      <div className="auth-links">
        <NavLink to="/uz/barbershop/auth/login" className="navlink-auth">
          <div className="login-link">
            <p>Kirish</p>
            <BiChevronsRight className="icon" />
          </div>
        </NavLink>
        <NavLink to="/uz/barbershop/auth/register" className="navlink-auth">
          <div className="register-link">
            <p>Ro'yxatdan o'tish</p>
            <BiChevronsRight className="icon" />
          </div>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Auth;
