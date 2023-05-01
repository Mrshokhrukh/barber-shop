import React from "react";
import Box from "@mui/material/Box";
import "./updateUser.scss";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { BiUpload } from "react-icons/bi";

const UserUpdate = (props) => {
  const [updateMaster, setUpdateMaster] = useState({});
  const [prevData, setPrevData] = useState(props.data);
  const [isEdit, setIsEdit] = useState(false);

  const [file, setFile] = useState();

  const handleChange = (e) => {
    setUpdateMaster({ ...updateMaster, [e.target.name]: e.target.value });
  };

  const editMaster = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    setUpdateMaster({});
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Master
        </Typography>
        <span className="closeBtn" onClick={() => props.handleClose()}>
          <IoClose />
        </span>

        <div id="modal-modal-description" sx={{ mt: 2 }}></div>
      </Box>
    </Modal>
  );
};

export default UserUpdate;
