import React, { useState } from "react";
import "./calendar.scss";
const CalendarDatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["пн", "вт", "cр", "чт", "пт", "сб", "вс"];

  const getNumberOfDaysInMonths = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getSortedDays = (year, month) => {
    const dayIndex = new Date(year, month, 1).getDay();
    const firstHalf = days.slice(dayIndex);

    return [...firstHalf, ...days.slice(0, dayIndex)];
  };
  const range = (start, end) => {
    const length = Math.abs((end - start) / 1);

    const { result } = Array.from({ length }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1,
      }),
      { result: [], current: start }
    );
    return result;
  };
  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };
  const prevMonth = () => {
    if (currentMonth > 1) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };
  const handleSelect = (event) => {
    if (event.target.id === "day") {
      setSelectedDate(new Date(currentYear, currentMonth, event.target.getAttribute("data-day")));
    }
  };
  return (
    <div className="calendar">
      <header className="header">
        <ion-icon onClick={prevMonth} name="chevron-back-outline" id="cal-icon"></ion-icon>
        <p>
          {months[currentMonth]} {currentYear}
        </p>
        <ion-icon onClick={nextMonth} name="chevron-forward-outline" id="cal-icon"></ion-icon>
      </header>
      <div className="days">
        {getSortedDays(currentYear, currentMonth).map((day) => {
          return (
            <p className="weak_days" key={day}>
              {day}
            </p>
          );
        })}
      </div>
      <div className="days" onClick={handleSelect}>
        {range(1, getNumberOfDaysInMonths(currentYear, currentMonth) + 1).map((day) => {
          return (
            <div
              key={day}
              id="day"
              data-day={day}
              className={
                selectedDate?.getTime() === new Date(currentYear, currentMonth, day).getTime()
                  ? "month_days active"
                  : "month_days"
              }
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDatePicker;
