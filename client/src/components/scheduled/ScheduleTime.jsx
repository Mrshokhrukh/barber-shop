import React from "react";
import { HiOutlineChevronRight, HiOutlineExclamationCircle } from "react-icons/hi";
import CalendarDatePicker from "../calendar/Calendar";
import "./masterAndDate.scss";

const ScheduleTime = () => {
  return (
    <div className="master-and-date">
      <div className="wrapper">
        <div className="pickedMaster">

          <div className="master" >
            <div className="left-in-responsive">
              <div className="photo">
                <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1" alt="404" />
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

        <div className="date">
          <CalendarDatePicker />
        </div>
      </div>
    </div>
  );
};

export default ScheduleTime;
