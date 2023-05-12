import React, { useRef, useState } from "react";
import { HiOutlineChevronRight, HiOutlineExclamationCircle } from "react-icons/hi";
import CalendarDatePicker from "../calendar/Calendar";
import "./masterAndDate.scss";

const ScheduleTime = () => {
  const workHours = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:30",
    "14:00",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  let selectedOnHover = [];
  
  const changeBackground = (e) => {
    // e.target.style.backgroundColor = "#0273b9fd";
    // e.target.style.color = "white";
    if (selectedOnHover.length < 2) {
      selectedOnHover.push(e.target);
    } else if (selectedOnHover.length >= 2) {
      selectedOnHover.splice(0, 2);
      selectedOnHover.push(e.target);
    }
  };
  const removeBack = (e) => {
    e.target.style.backgroundColor = "";
    e.target.style.color = "";
  };

  return (
    <div className="master-and-date">
      <div className="wrapper">
        <div className="pickedMaster">
          <div className="master">
            <div className="left-in-responsive">
              <div className="photo">
                <img
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1"
                  alt="404"
                />
                <div>
                  <HiOutlineExclamationCircle className="i" />
                </div>
              </div>
              <div className="master_name">
                <p className="name">shokhrukhabdvokhidov</p>
                <p className="duty">Barber</p>
              </div>
            </div>

            <div>
              <HiOutlineChevronRight className="icon" />
            </div>
          </div>
        </div>

        <div className="calendar_date">
          <CalendarDatePicker minDate={new Date(2023, 4, 11)} maxDate={new Date(2023, 11, 11)} />
          <div className="date_days">
            {workHours?.map((hours, i) => {
              return (
                <span onMouseOver={changeBackground} onMouseOut={removeBack} id={i + 1} key={i}>
                  {hours}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTime;
