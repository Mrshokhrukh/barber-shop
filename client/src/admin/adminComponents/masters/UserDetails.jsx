import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = (props) => {
  let navigate = useNavigate();

  const updatingUser = (id) => {
    axios
      .put(`http://127.0.0.1:8000/get-master/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate(`/admin/dashboard/workers/${id}`, { state: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>{props.master.id}</td>
      <td>{props.master.first_name}</td>
      <td>{props.master.phone}</td>
      <td>oo</td>
      <td>
        <button className="viewButton">View</button>
      </td>
      <td>
        <button className="deleteButton">Delete</button>
      </td>
      <td>
        <button className="updateButton" onClick={() => updatingUser(props.master.id)}>
          Update
        </button>
      </td>
    </tr>
  );
};

export default UserDetails;
