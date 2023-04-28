import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./masters.scss";
import axios from "axios";
import UserDetails from "./UserDetails";

const Datatable = () => {
  const [masterData, setMasterData] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get-masters")
      .then((response) => {
        setMasterData(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Master
        <Link to="/admin/dashboard/workers/new" className="link">
          Add New
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Phone number</th>
            <th>Service</th>
            <th>Actions</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {masterData &&
            masterData.map((master,index) => {
              return <UserDetails master={master} key={index}/>;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
