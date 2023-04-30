import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = (props) => {
  let navigate = useNavigate();

  let user = props.master;

  const updatingUser = (id) => {
    axios
      .get(`http://127.0.0.1:8000/get-master/${id}`)
      .then((res) => {
        navigate(`/admin/dashboard/workers/${id}`, { state: res.data });
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
    <tr>
      <td>{user.id}</td>
      <td>
        <img src={user.image} alt="404" className="user-img" />
      </td>
      <td>
        {user.first_name} {user.last_name}
      </td>
      <td>{user.phone}</td>
      <td>oo</td>
      <td>
        <button className="updateButton" onClick={() => updatingUser(user.id)}>
          Ko'rish
        </button>
      </td>
      <td>
        <button className="deleteButton" onClick={() => deleteUser(user.id)}>
          O'chirish
        </button>
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
      </td>
    </tr>
  );
};

export default UserDetails;
