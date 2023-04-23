import React from "react";

const Sidebar = () => {
  return (
    <div>
      <button>
        <Link to="/services">Hizmatlar</Link>
      </button>
      <button>
        <Link to="/masters">Ishchilar</Link>
      </button>
    </div>
  );
};

export default Sidebar;
