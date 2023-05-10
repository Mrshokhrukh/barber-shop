import React from "react";
import CalendarDatePicker from "../calendar/Calendar";
import "./masterAndDate.scss";

const ScheduleTime = () => {
  return (
    <div className="master-and-date">
      <div className="wrapper">
        <div className="pickedMaster"></div>
        <div className="date">
          <CalendarDatePicker />
        </div>
      </div>
    </div>
  );
};

export default ScheduleTime;
