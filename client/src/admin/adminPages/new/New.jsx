import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import AdminSidebar from "../../adminComponents/adminSidebar/adminSidebar";
import Navbar from "../../adminComponents/navbar/Navbar";
import axios from "axios";

const New = () => {
  const [file, setFile] = useState(null);
  const [newMaster, setNewMaster] = useState({});

  const handleChange = (e) => {
    setNewMaster({ ...newMaster, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file, file.name);
    
    await axios
      .post("http://127.0.0.1:8000/image", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });

    try {
      axios
        .post("http://127.0.0.1:8000/add", newMaster)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            console.log(error.response.data.detail);
          }
        });
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="new">
      <AdminSidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Master to the Barbershop</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className="profileImg"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Ism :</label>
                <input
                  type="text"
                  name="first_name"
                  value={newMaster.first_name || ""}
                  onChange={handleChange}
                  placeholder="Ismingizni kiriting"
                  required
                />
              </div>
              <div className="formInput">
                <label>Familiya: </label>
                <input
                  type="text"
                  name="last_name"
                  value={newMaster.last_name || ""}
                  onChange={handleChange}
                  placeholder="Familiyangizni kiriting"
                  required
                />
              </div>
              <div className="formInput">
                <label>Telefon Raqam: </label>
                <input
                  type="text"
                  name="phone"
                  value={newMaster.phone || ""}
                  onChange={handleChange}
                  placeholder="Telefon raqamingizni kiriting"
                  required
                />
              </div>
              {/* <div className="formInput">
                <label>Vazifalari: </label>
                <input
                  type="text"
                  name="service"
                  value={newMaster.service || ""}
                  onChange={handleChange}
                  placeholder="Vazifalaringizni kiriting"
                  required
                />
              </div> */}

              {/* <div className="formInput">
                <label>Ish vaqti: </label>
                <input
                  type="text"
                  name="time"
                  value={newMaster.time || ""}
                  onChange={handleChange}
                  placeholder="Ish vaqtingizni kiriting"
                  required
                />
              </div> */}

              <button>Qo'shish</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
