import React from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/auth/Login";

const Sidebar = () => {
  return (
    <div>
      <button>
        <Link to="/services">Hizmatlar</Link>
      </button>
      <button>
        <Link to="/masters/1">Ishchilar</Link>
      </button>
      <hr />
      <Link to="/auth/login">Royxatdan o'tish</Link>
    </div>
  );
};

export default Sidebar;
