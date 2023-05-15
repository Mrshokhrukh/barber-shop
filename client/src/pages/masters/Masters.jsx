import axios from "axios";
import React, { useEffect, useState } from "react";
import "./master.scss";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import apiURL from "../../http";
import { useNavigate } from "react-router-dom";

const Masters = () => {
  let navigate = useNavigate();
  const [masterData, setMasterData] = useState();

  useEffect(() => {
    axios
      .get(`${apiURL}/get-masters`)
      .then((response) => {
        setMasterData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });
  }, []);

  let checkServicesIsDone = localStorage.getItem("services");
  const showServices = (user) => {
    localStorage.setItem(`master:${user.id}`, JSON.stringify(user));

    if (checkServicesIsDone) {
      navigate("/uz/barbershop/master-and-date");
    } else {
      navigate(`/uz/barbershop/services`, { state: user });
    }
  };

  setTimeout(() => {
    localStorage.clear();
  }, 1000);
  // localStorage.clear()

  return (
    <div className="masters_list">
      <div className="master_data">
        <div className="master" onClick={() => showServices({ name: "shokhrukh", age: 12, id: 1 })}>
          <div className="left-in-responsive">
            <div className="photo">
              <img src={"user.image"} alt="" />
              <div>
                <HiOutlineExclamationCircle className="i" />
              </div>
            </div>
            <div className="master_name">
              <p className="name">
                {"user.first_name"} {"user.last_name"}
              </p>
              <p className="duty">Barber</p>
            </div>
          </div>

          <div>
            <HiOutlineChevronRight className="icon" />
          </div>
        </div>
        <div className="master" onClick={() => showServices({ name: "shrukh", age: 12, id: 2 })}>
          <div className="left-in-responsive">
            <div className="photo">
              <img src={"user.image"} alt="" />
              <div>
                <HiOutlineExclamationCircle className="i" />
              </div>
            </div>
            <div className="master_name">
              <p className="name">
                {"user.first_name"} {"user.last_name"}
              </p>
              <p className="duty">Barber</p>
            </div>
          </div>

          <div>
            <HiOutlineChevronRight className="icon" />
          </div>
        </div>

        {masterData &&
          masterData.map((user, index) => {
            return (
              <div className="master" key={index} onClick={() => showServices(user)}>
                <div className="left-in-responsive">
                  <div className="photo">
                    <img src={"user.image"} alt="" />
                    <div>
                      <HiOutlineExclamationCircle className="i" />
                    </div>
                  </div>
                  <div className="master_name">
                    <p className="name">
                      {"user.first_name"} {"user.last_name"}
                    </p>
                    <p className="duty">Barber</p>
                  </div>
                </div>

                <div>
                  <HiOutlineChevronRight className="icon" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Masters;
