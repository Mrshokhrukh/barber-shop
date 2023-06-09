import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import "./sidebar.scss";
import { MdClose } from "react-icons/md";
const Sidebar = (props) => {
  const close = () => {
    if (window.innerWidth < 768) {
      props.closeSidebar(false);
    }
  };

  return (
    <div className={props.isOpen ? "sidebar open" : " sidebar"}>
      <MdClose className="close-icon" onClick={close} />
      <div className="sidebar-image">
        <img
          src="https://media.istockphoto.com/id/872361244/photo/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612&w=0&k=20&c=_IjZcrY0Gp-2z6AWTQederZCA9BLdl-iqWkH0hGMTgg="
          alt="sidebar"
        />
      </div>
      <div className="sidebar_layer-center">
        <div className="sidebar_subtitle">
          <h3>BARBERSHOP ELEVEN</h3>
          <p>SEC "Atlas" Amir Timur st., 224</p>
          <p>Mon-Sun: 10:00-21:00</p>
        </div>
        {/* <div className="layer-line"></div> */}
        <div className="sidebar_lists">
          <button onClick={close}>
            <NavLink to="/uz/barbershop/services">
              Hizmatlar
              <span>
                <BsChevronRight />
              </span>
            </NavLink>
          </button>
          <button onClick={close}>
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
          <Link to="/uz/barbershop/auth/login">
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
