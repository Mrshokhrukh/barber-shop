import React, { useRef, useState } from "react";
import { HiOutlineChevronRight, HiOutlineExclamationCircle } from "react-icons/hi";
import { months, weekDays, workHours } from "../../date";
import CalendarDatePicker from "../calendar/Calendar";
import "./masterAndDate.scss";

const ScheduleTime = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentDay, setcurrentDay] = useState(new Date().getDate());
  const [currentYear, setcurrentYear] = useState(new Date().getFullYear());
  const [weekday, setcurrentWeekDay] = useState(new Date().getDay());
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();

  // const handleSelectDate = (month, date, day) => {
  //   setSelectedDate({ month, date, day });
  //   // console.log(months[selectedDate.getMonth()],selectedDate.getDate(),weekDays[selectedDate.getDay()]);

  //   console.log(selectedDate);
  // };

  let selectedOnHover = [];

  const changeBackground = (e) => {
    e.target.style.backgroundColor = "#0273b9fd";
    e.target.style.color = "white";

    // if (selectedOnHover.length < 2) {
    //   selectedOnHover.push(e.target);
    // } else if (selectedOnHover.length >= 2) {
    //   selectedOnHover.splice(0, 2);
    //   selectedOnHover.push(e.target);
    // }
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
          <CalendarDatePicker
            minDate={new Date(currentYear, currentMonth, currentDay)}
            maxDate={new Date(2023, 11, 11)}
            // handleSelectDate={handleSelectDate}
          />
          <div className="date_days">
            <h3>O'zingizga qulay vaqtni tanlang</h3> <br />
            <div className="hours">
              {workHours?.map((hours, i) => {
                return (
                  <span
                    onMouseOver={changeBackground}
                    onMouseOut={removeBack}
                    id={hours}
                    key={hours}
                    // onClick={handleSelectDate}
                  >
                    {hours}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTime;
