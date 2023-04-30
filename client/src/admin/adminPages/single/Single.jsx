import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../../adminComponents/adminSidebar/adminSidebar";
import Chart from "../../adminComponents/chart/Chart";
import Navbar from "../../adminComponents/navbar/Navbar";
import AdminTable from "../../adminComponents/table/Table";
import UserUpdate from "./UserUpdate";
import "./single.scss";

const SingleUser = () => {
  let location = useLocation();
  const [open, setOpen] = useState(false);
  let user = location.state;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="single">
      <AdminSidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user.image} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{user.first_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.services} email </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phone}</span>
                </div>

                <div className="editButton" onClick={handleOpen}>
                  Yangilash
                </div>
                <UserUpdate handleClose={() => handleClose()} open={open} data={user} />
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
