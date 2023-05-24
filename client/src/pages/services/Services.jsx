import React, { useEffect, useState } from "react";
import "./service.scss";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { BsCheck } from "react-icons/bs";
import apiURL from "../../http";
import Bottom from "../../components/bottom/Bottom";
import { useLocation } from "react-router-dom";
const Services = () => {
  let location = useLocation();
  const [serviceData, setServiceData] = useState();
  const [checkedServices, setCheckedServices] = useState([]);
  const [query, setQuery] = useState("");
  let checkStorage = localStorage.getItem(`master`);

  useEffect(() => {
    axios
      .get(`${apiURL}/services`)
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
    localStorage.setItem("services", JSON.stringify(newCheckedItems));
  };

  return (
    <>
      <div className="services">
        <div className="search">
          <form>
            <BsSearch className="search-icon" />
            <input
              type="text"
              name="search"
              placeholder="Search in Price Eleven (total 0)"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="service-details">
          <p className="entry-text">hairdressing services</p>
          {serviceData &&
            serviceData
              .filter((i) => {
                return query === "" ? i : i.name.toLowerCase().includes(query);
              })
              .map((service, index) => {
                return (
                  <div
                    className={
                      checkedServices.includes(service)
                        ? "details checked"
                        : "details"
                    }
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
      <Bottom checkStorage={checkStorage} checkedServices={checkedServices} />
    </>
  );
};

export default Services;
