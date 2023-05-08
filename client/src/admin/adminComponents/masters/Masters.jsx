import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./masters.scss";
import axios from "axios";
import UserDetails from "./UserDetails";
import AllMasterServices from "../../Services/AllMasterServices";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Datatable = () => {
  const [masterData, setMasterData] = useState();

  useEffect(() => {
    axios
      .get("https://server-1-x7613193.deta.app/get-masters")
      .then((response) => {
        setMasterData(response.data);
      })
      .catch((error) => {
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
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Id.</TableCell>
              <TableCell className="tableCell">account</TableCell>
              <TableCell className="tableCell">Ism Familiya</TableCell>
              <TableCell className="tableCell">Telefon Raqam</TableCell>
              {/* <TableCell className="tableCell"></TableCell> */}
              <TableCell className="tableCell">tahrirlash</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {masterData &&
              masterData.map((master, index) => {
                return <UserDetails master={master} key={index} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        {masterData &&
          masterData.map((datas, index) => {
            return <AllMasterServices key={index} serviceDatas={datas.master_services} />;
          })}
      </div>
    </div>
  );
};

export default Datatable;
