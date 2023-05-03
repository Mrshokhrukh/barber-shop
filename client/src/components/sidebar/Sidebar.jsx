import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "../../pages/auth/Login";
import { BsChevronRight } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import "./sidebar.scss";

const Sidebar = (props) => {
  return (
    <div className={props.isOpen ? "sidebar" : "sidebar open"}>
      <div className="sidebar-image">
        <img src="https://widget.sonline.su/i/place_picture.jpg" alt="sidebar" />
      </div>

      <div className="sidebar_layer-center">
        <div className="sidebar_subtitle">
          <h3>BARBERSHOP ELEVEN</h3>
          <p>SEC "Atlas" Amir Timur st., 224</p>
          <p>Mon-Sun: 10:00-21:00</p>
        </div>
        {/* <div className="layer-line"></div> */}
        <div className="sidebar_lists">
          <button >
            <NavLink to="/uz/barbershop/services">
              Hizmatlar
              <span>
                <BsChevronRight />
              </span>
            </NavLink>
          </button>
          <button>
            <NavLink to="/uz/barbershop/masters">
              Ishchilar
              <span>
                <BsChevronRight />
              </span>
            </NavLink>
          </button>
        </div>
        {/* <div className="layer-line"></div> */}
        <div className="auth-link-sidebar">
          <Link to="/auth/login">
            {" "}
            <span>
              <SlLogin />
            </span>
            Royxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
