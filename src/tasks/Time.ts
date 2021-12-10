import { setRecoil } from "recoil-nexus";
import TimeMemory, { DayOfWeekType, MonthType } from "../memory/Time";

function intervalHandler() {
  const now = new Date();

  let dayOfWeek: DayOfWeekType;
  switch (now.getDay()) {
    case 0:
      dayOfWeek = "Sunday";
      break;
    case 1:
      dayOfWeek = "Monday";
      break;
    case 2:
      dayOfWeek = "Tuesday";
      break;
    case 3:
      dayOfWeek = "Wednesday";
      break;
    case 4:
      dayOfWeek = "Thursday";
      break;
    case 5:
      dayOfWeek = "Friday";
      break;
    case 6:
      dayOfWeek = "Saturday";
      break;
    default:
      dayOfWeek = "";
  }

  let month: MonthType;
  switch (now.getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
    default:
      month = "";
  }

  setRecoil(TimeMemory, {
    second: now.getSeconds(),
    minute: now.getMinutes(),
    hour: now.getHours(),
    dayOfWeek,
    dayOfMonth: now.getDate(),
    month,
    year: now.getFullYear(),
  });
}

export default function TimeTask() {
  intervalHandler();
  window.setInterval(intervalHandler, 1000);
}
