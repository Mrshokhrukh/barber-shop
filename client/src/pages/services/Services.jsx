import React, { useEffect, useRef, useState } from "react";
import "./service.scss";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { BsCheck } from "react-icons/bs";
const Services = () => {
  const [serviceData, setServiceData] = useState();
  const [checkedServices, setCheckedServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://server-1-x7613193.deta.app/services")
      .then((response) => {
        setServiceData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.detail);
        }
      });
  }, []);

  const handleCheck = (data) => {
    const currentIndex = checkedServices.indexOf(data);
    const newCheckedItems = [...checkedServices];
    if (currentIndex === -1) {
      newCheckedItems.push(data);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }
    setCheckedServices(newCheckedItems);
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
          serviceData.map((service, index) => {
            return (
              <div
                className={checkedServices.includes(service) ? "details checked" : "details"}
                onClick={() => handleCheck(service)}
                key={index}
              >  
                <div className="left">
                  <p className="service_name">{service.name}</p>
                  <div className="time_price">
                    <p className="price">{service.price}</p>
                    <p className="time">60 min</p>
                  </div>
                </div>
                <div className="right-checkbox">
                  <div className="check">
                    <BsCheck />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Services;
