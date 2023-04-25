import AdminSidebar from "../../adminComponents/adminSidebar/adminSidebar";
import Chart from "../../adminComponents/chart/Chart";
import Featured from "../../adminComponents/featured/Featured";
import Navbar from "../../adminComponents/navbar/Navbar";
import AdminTable from "../../adminComponents/table/Table";
import Widget from "../../adminComponents/widget/Widget";
import List from "../list/List";
import './home.scss'
const AdminHome = () => {
  return (
    <div className="home">
      <AdminSidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Oxirgi Mijozlar</div>
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
