export const workHours = [
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

export const months = [
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
export const days = ["пн", "вт", "cр", "чт", "пт", "сб", "вс"];

export const getNumberOfDaysInMonths = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
export const getSortedDays = (year, month) => {
  const dayIndex = new Date(year, month, 1).getDay();
  const firstHalf = days.slice(dayIndex);

  return [...firstHalf, ...days.slice(0, dayIndex)];
};
export const range = (start, end) => {
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

export const weekDays =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]