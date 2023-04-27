import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './masters.scss'
import axios from "axios";

const Datatable = () => {
  const [masterData,setMasterData]=useState()


  // useEffect(() => {
  //   axios
  //   .get("http://127.0.0.1:8000/masters")
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     if (error.response) {
  //       console.log(error.response.data.detail);
  //     }
  //   });
  // }, [])


  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Master
        <Link to="/admin/dashboard/workers/new" className="link">
          Add New
        </Link>
      </div>

      
      
    </div>
  );
};

export default Datatable;
