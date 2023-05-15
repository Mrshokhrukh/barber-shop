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
  setTimeout(() => {
    localStorage.clear();
  }, 500000);
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

  const showServices = (user) => {
    localStorage.setItem(`master:${user.id}`, JSON.stringify(user));
    navigate(`/uz/barbershop/services`, { state: user });
  };

  // localStorage.clear()

  return (
    <div className="masters_list">
      <div className="master_data">
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
