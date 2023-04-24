import AdminSidebar from "../../adminComponents/adminSidebar/adminSidebar";
import Datatable from "../../adminComponents/datatable/Datatable";
import Navbar from "../../adminComponents/navbar/Navbar";
import "./list.scss";

const List = () => {
  return (
    <div className="list">
      <AdminSidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
