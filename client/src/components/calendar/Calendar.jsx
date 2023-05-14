import React, { useEffect, useState } from "react";
import { getNumberOfDaysInMonths, getSortedDays, months, range, weekDays } from "../../date";
import "./calendar.scss";
const CalendarDatePicker = ({ minDate, maxDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const getTimeFromState = (_day) => {
    return new Date(currentYear, currentMonth, _day).getTime();
  };

  // useEffect(() => {
  //   handleSelectDate(
  //     months[selectedDate.getMonth()],
  //     selectedDate.getDate(),
  //     weekDays[selectedDate.getDay()]
  //   );
  // }, []);

  return (
    <div className="calendar_wrapper">
      <div className="calendar">
        <header className="header">
          <button onClick={prevMonth} disabled={minDate?.getTime() > getTimeFromState(1)}>
            <ion-icon name="chevron-back-outline" id="cal-icon"></ion-icon>
          </button>
          <p>
            {months[currentMonth]} {currentYear}
          </p>
          <button
            onClick={nextMonth}
            disabled={
              maxDate?.getTime() <
              getTimeFromState(getNumberOfDaysInMonths(currentYear, currentMonth))
            }
          >
            <ion-icon name="chevron-forward-outline" id="cal-icon"></ion-icon>
          </button>
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
              <button
                key={day}
                disabled={minDate?.getTime() > getTimeFromState(day)}
                id="day"
                data-day={day}
                className={
                  selectedDate?.getDate() === new Date(currentYear, currentMonth, day).getDate()
                    ? "month_days active"
                    : "month_days"
                }
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="selected_date_time">
        <p>
          {months[selectedDate.getMonth()]} {selectedDate.getDate()},{" "}
          {weekDays[selectedDate.getDay()]}
        </p>
      </div>
    </div>
  );
};

export default CalendarDatePicker;
