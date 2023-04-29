import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const UserDetails = (props) => {
  let navigate = useNavigate();
  let alert = useRef(null);
  const [data, setData] = useState("");
  const updatingUser = (id) => {
    axios
      .get(`http://127.0.0.1:8000/get-master/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate(`/admin/dashboard/workers/${id}`, { state: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/delete-master/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const alerting = () => {
      alert.current.style.display = "block";
      window.location.reload(true);
    };
    alerting();

    // setTimeout(() => {
    //   alert.current.style.display = "none";
    //   console.log("dasdsa");
    // }, 3000);
  };

  return (
    <tr>
      <td>{props.master.id}</td>
      <td>
        <img src={props.master.image} alt="404" className="user-img" />
      </td>
      <td>{props.master.first_name}</td>
      <td>{props.master.phone}</td>
      <td>oo</td>
      <td>
        <button className="deleteButton" onClick={() => deleteUser(props.master.id)}>
          Delete
        </button>
      </td>
      <Stack
        sx={{ width: "100%" }}
        spacing={2}
        className="animate__animated animate__bounceInRight alert"
        ref={alert}
      >
        <Alert severity="success">{data} !</Alert>
      </Stack>
      <td>
        <button className="updateButton" onClick={() => updatingUser(props.master.id)}>
          View
        </button>
      </td>
    </tr>
  );
};

export default UserDetails;
