import { atom } from "recoil";

export type MonthType =
  | ""
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type DayOfWeekType =
  | ""
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface TimeMemoryType {
  second: number;
  minute: number;
  hour: number;
  dayOfWeek: DayOfWeekType;
  dayOfMonth: number;
  month: MonthType;
  year: number;
}

export const Time = atom<TimeMemoryType>({
  key: "time",
  default: {
    second: 0,
    minute: 0,
    hour: 0,
    dayOfWeek: "",
    dayOfMonth: 0,
    month: "",
    year: 0,
  },
});

export function zeroify(input: number | string): string {
  let numInput: number;
  if (typeof input === "string") {
    numInput = Number(input);
  } else if (typeof input === "number") {
    numInput = input;
  } else {
    numInput = NaN;
  }

  if (Number.isNaN(numInput)) {
    return "00";
  } else if (numInput < 10) {
    return "0" + String(numInput);
  } else {
    return String(numInput);
  }
}

export function ordinalize(input: number): string {
  const firstDecimal = input % 10;
  switch (firstDecimal) {
    case 1:
      return input + "st";
    case 2:
      return input + "nd";
    case 3:
      return input + "rd";
    default:
      return input + "th";
  }
}

export default Time;
