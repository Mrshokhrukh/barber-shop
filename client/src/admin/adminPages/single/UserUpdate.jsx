import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const UserUpdate = (props) => {
  const [updateMaster, setUpdateMaster] = useState({});

  const [isEdit, setIsEdit] = useState(false);

  const [file, setFile] = useState();
  const handleChange = (e) => {
    setUpdateMaster({ ...updateMaster, [e.target.name]: e.target.value });
  };

  const editMaster = () => {
    setIsEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMaster({});
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Master
        </Typography>
        <span className="closeBtn" onClick={() => props.handleClose()}>
          <IoClose />
        </span>

        <div id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="updateMaster">
            <div className="left">
              <img
                src={file ? URL.createObjectURL(file) : props.data.image}
                alt=""
                className="profileImg"
              />
              <div className="uploadImg">
                <label htmlFor="file">
                  Image: <MdModeEdit className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="right">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label>Ism:</label>
                  <input
                    type="text"
                    name="first_name"
                    value={updateMaster.first_name || ""}
                    onChange={handleChange}
                    placeholder="Ismingizni kiriting"
                    required
                  />
                  <button className="editBtn" onClick={editMaster}>
                    <MdModeEdit />
                  </button>
                </div>
                <div className="formInput">
                  <label>Familiya: </label>

                  <input
                    type="text"
                    name="last_name"
                    value={updateMaster.last_name || ""}
                    onChange={handleChange}
                    placeholder="Familiyangizni kiriting"
                    required
                  />
                  <button className="editBtn" onClick={editMaster}>
                    <MdModeEdit />
                  </button>
                </div>
                <div className="formInput">
                  <label>Telefon Raqam: </label>
                  <input
                    type="text"
                    name="phone"
                    value={updateMaster.phone || ""}
                    onChange={handleChange}
                    placeholder="Telefon raqamingizni kiriting"
                    required
                  />
                  <button className="editBtn" onClick={editMaster}>
                    <MdModeEdit />
                  </button>
                </div>

                <button>Update</button>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UserUpdate;
