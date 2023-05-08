import React, { useEffect, useState } from "react";
import "./service.scss";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
const Services = () => {
  const [serviceData, setServiceData] = useState();

  useEffect(() => {
    axios
      .get("https://server-1-x7613193.deta.app/get-masters")
      .then((response) => {
        setServiceData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });
  }, []);

  const clickedService = () => {
    console.log("as");
  };

  return (
    <div className="services">
      <div className="search">
        <form>
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search in Price Eleven (total 0)" />
        </form>
      </div>
      <div className="service-details">
        <p className="entry-text">hairdressing services</p>
        {serviceData &&
          serviceData.map((user, index) => {
            return (
              <div className="details" key={index}>
                <div className="left">
                  <p className="service_name">{user.first_name}'s Haircut</p>
                  <div className="time_price">
                    <p className="price">100 000</p>
                    <p className="time">60 min</p>
                  </div>
                </div>

                <div className="right-checkbox">
                  <div className="check"></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Services;
