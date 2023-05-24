import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from "react";
import AdminSidebar from "../../adminComponents/adminSidebar/adminSidebar";
import Navbar from "../../adminComponents/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiURL from "../../../http";

const New = () => {
  const [file, setFile] = useState(null);
  const [newMaster, setNewMaster] = useState({});
  const [checkBoxes, setCheckBoxes] = useState();
  let serviceData = useRef({});
  // const [serviceData, setServiceDate] = useState([{ name: "eshmat" }, { surname: "toshmatov" }]);

  let navigate = useNavigate();
  const handleChange = (e) => {
    setNewMaster({ ...newMaster, [e.target.name]: e.target.value });
  };
  
  let access_token = localStorage.getItem("access_token");

  useEffect(() => {
    axios.get(`${apiURL}/services`).then((response) => {
      setCheckBoxes(response.data);
    });
  }, []);

  const serviceChange = (e) => {
    // setNewMaster({ ...newMaster, });
    serviceData.current = { ...serviceData.current, [e.target.id]: "" };
    // let a = JSON.stringify(Object.keys(serviceData.current));
    let str = "";
    for (let i in serviceData.current) {
      if (Object.prototype.hasOwnProperty.call(serviceData.current, i)) {
        str += i + "," + `${serviceData.current[i]}`;
      }
    }
    setNewMaster({ ...newMaster, master_services: str });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { ...newMaster, image: file };

    await axios
      .post(`${apiURL}/add-master`, data, {
        headers: { Authorization: `Bearer ${JSON.parse(access_token)}` },
      })
      .then((response) => {
        const notify = () => toast.success(response.data);
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
                  {checkBoxes &&
                    checkBoxes.map((item, index) => {
                      return (
                        <div className="service" key={index + 1}>
                          <input
                            type="checkbox"
                            name={item.name}
                            value={""}
                            onChange={serviceChange}
                            id={item.id}
                          />
                          <label htmlFor={item.name}>{item.name}</label>
                        </div>
                      );
                    })}
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
