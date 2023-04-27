import AdminSidebar from "../../adminComponents/adminSidebar/adminSidebar";
import Masters from "../../adminComponents/masters/Masters";
import Navbar from "../../adminComponents/navbar/Navbar";
import "./list.scss";

const List = () => {
  return (
    <div className="list">
      <AdminSidebar />
      <div className="listContainer">
        <Navbar />
        <Masters />
      </div>
    </div>
  );
};

export default List;
