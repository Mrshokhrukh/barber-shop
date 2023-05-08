import axios from "axios";
import React, { useEffect, useState } from "react";
import "./master.scss";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const Masters = () => {
  const [masterData, setMasterData] = useState();
  useEffect(() => {
    axios
      .get("https://server-1-x7613193.deta.app/get-masters")
      .then((response) => {
        setMasterData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });
  }, []);
  
  return (
    <div className="masters_list">
      <div className="master_data">
        {masterData &&
          masterData.map((user, index) => {
            return (
              <div className="master" key={index}>
                <div className="left-in-responsive">
                  <div className="photo">
                    <img src={user.image} alt="" />
                    <div>
                      <HiOutlineExclamationCircle className="i" />
                    </div>
                  </div>
                  <div className="master_name">
                    <p className="name">
                      {user.first_name} {user.last_name}
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
