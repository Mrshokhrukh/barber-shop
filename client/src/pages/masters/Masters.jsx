import axios from "axios";
import React, { useEffect, useState } from "react";
import "./master.scss";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const Masters = () => {
  const [masterData, setMasterData] = useState();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get-masters")
      .then((response) => {
        setMasterData(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });
  }, []);
  return (
    <div className="masters_list">
      <div className="master_data">
        {masterData &&
          masterData.map((user) => {
            return (
              <div className="master">
                <div className="left-in-responsive">
                  <div className="photo">
                    <img
                      src="https://i.pinimg.com/originals/82/9e/6d/829e6d37c5845732e657d25ff8950a67.jpg"
                      alt=""
                    />
                    <div>
                      <HiOutlineExclamationCircle className="i" />
                    </div>
                  </div>
                  <div className="master_name">
                    <p className="name">Akobir Baxodirovich</p>
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
