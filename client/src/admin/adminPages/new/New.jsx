import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from "react";
import AdminSidebar from "../../adminComponents/adminSidebar/adminSidebar";
import Navbar from "../../adminComponents/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const New = () => {
  const [file, setFile] = useState(null);
  const [newMaster, setNewMaster] = useState({});
  let serviceData = useRef([]);

  let navigate = useNavigate();

  const handleChange = (e) => {
    setNewMaster({ ...newMaster, [e.target.name]: e.target.value });
  };

  const serviceChange = (e) => {
    serviceData.current = [...serviceData.current, e.target.name];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { ...newMaster, services: serviceData.current, image: file };
    
    await axios
      .post("http://127.0.0.1:8000/add-master", data, {
        headers: { Accept: "application/json", "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const notify = () => toast.success(response.data.detail);
        notify();
        setTimeout(() => {
          navigate("/admin/dashboard/workers/");
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          const notify = () => toast.error(error.response.data.detail);
          notify();
        }
      });
  };

  return (
    <div className="new">
      <AdminSidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Master to the Barbershop</h1>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          draggable
          theme="dark"
          className="alert-msg"
        />

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
              <div className="master-services">
                <label>Hizmatlar</label>
                <div className="services">
                  <div className="service">
                    <input
                      type="checkbox"
                      name="full-haircut"
                      value={""}
                      onChange={serviceChange}
                      id="full-haircut"
                    />
                    <label htmlFor="full-haircut">To'liq soch - soqol</label>
                  </div>
                  <div className="service">
                    <input
                      type="checkbox"
                      name="haircut"
                      value={""}
                      onChange={serviceChange}
                      id="haircut"
                    />
                    <label htmlFor="haircut">Soch olish</label>
                  </div>
                  <div className="service">
                    <input
                      type="checkbox"
                      name="beard"
                      value={""}
                      onChange={serviceChange}
                      id="beard"
                    />
                    <label htmlFor="beard">Soqol olish</label>
                  </div>

                  <div className="service">
                    <input
                      type="checkbox"
                      name="beard-hair-coloring"
                      value={""}
                      onChange={serviceChange}
                      id="beard-hair-coloring"
                    />
                    <label htmlFor="beard-hair-coloring">Soch - Soqol bo'yash</label>
                  </div>

                  <div className="service">
                    <input
                      type="checkbox"
                      name="wedding-hairstyles"
                      value={""}
                      onChange={serviceChange}
                      id="wedding-hairstyles"
                    />
                    <label htmlFor="wedding-hairstyles">Kuyov soch soqol stil</label>
                  </div>
                  <div className="service">
                    <input
                      type="checkbox"
                      name="childeren-haircut"
                      value={""}
                      onChange={serviceChange}
                      id="childeren-haircut"
                    />
                    <label htmlFor="childeren-haircut">Bolalar soch turmagi (11 yoshgacha)</label>
                  </div>
                  <div className="service">
                    <input
                      type="checkbox"
                      name="face-cleaning"
                      value={""}
                      onChange={serviceChange}
                      id="face-cleaning"
                    />
                    <label htmlFor="face-cleaning">Yuz tozalash</label>
                  </div>
                  <div className="service">
                    <input
                      type="checkbox"
                      name="black-mask"
                      value={""}
                      onChange={serviceChange}
                      id="black-mask"
                    />
                    <label htmlFor="black-mask">Qora maska</label>
                  </div>
                </div>
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
