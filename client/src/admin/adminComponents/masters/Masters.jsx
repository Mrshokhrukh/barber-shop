import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./masters.scss";
import axios from "axios";
import UserDetails from "./UserDetails";
import AllMasterServices from "../../Services/AllMasterServices";

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
            <th>Surat.</th>
            <th>Ism Familiya</th>
            <th>Telefon Raqam</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {masterData &&
            masterData.map((master, index) => {
              return <UserDetails master={master} key={index} />;
            })}
        </tbody>
      </table>

      <div>
        {masterData &&
          masterData.map((datas, index) => {
            return <AllMasterServices key={index} services={datas.master_services} />;
          })}
      </div>
    </div>
  );
};

export default Datatable;
