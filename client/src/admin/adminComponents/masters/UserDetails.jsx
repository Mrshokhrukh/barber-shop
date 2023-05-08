import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const UserDetails = (props) => {
  let navigate = useNavigate();
  let user = props.master;

  const updatingUser = (id) => {
    axios
      .get(`http://127.0.0.1:8000/get-master/${id}`)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/admin/dashboard/workers/${id}`, { state: res.data });
        } else {
          console.log("user topilmadi");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/delete-master/${id}`)
      .then((response) => {
        const notify = () => toast.success(response.data);
        notify();
      })
      .catch((err) => {
        console.log(err);
      });

    // setTimeout(() => {
    //   alert.current.style.display = "none";
    //   console.log("dasdsa");
    // }, 3000);
  };

  return (
    <TableRow>
      <TableCell className="tableCell">{user.id}</TableCell>
      <TableCell className="tableCell">
        <div className="cellWrapper">
          <img src={user.image} alt="" className="image" />
        </div>
      </TableCell>
      <TableCell className="tableCell">
        {user.first_name} {user.last_name}
      </TableCell>
      <TableCell className="tableCell">{user.phone}</TableCell>
      <TableCell className="tableCell">
        <button className="updateButton" onClick={() => updatingUser(user.id)}>
          Ko'rish
        </button>
      </TableCell>
      <TableCell className="tableCell">
        <button className="deleteButton" onClick={() => deleteUser(user.id)}>
          O'chirish
        </button>
      </TableCell>
      <TableCell className="tableCell">
        <ToastContainer
          position="top-right"
          autoClose={900}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          draggable
          theme="dark"
          className="alert-msg"
        />
      </TableCell>
    </TableRow>
  );
};

export default UserDetails;
