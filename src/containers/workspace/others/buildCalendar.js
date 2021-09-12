import moment from "moment";
import { DAY, WEEK, SUN, DAYS, WEEKENDS, DAY_FMT } from "./constants";

export default function buildCalendar(value = moment(), view = 1) {
  value = value.format(DAY_FMT) === SUN ? value.subtract(1, DAYS) : value;

  const startDay = value.clone().startOf(WEEK);
  const endDay = value
    .clone()
    .endOf(WEEK)
    .add(view - 1, WEEK);

  const day = startDay.clone();
  const calendar = [];

  while (!day.isAfter(endDay, DAY)) {
    calendar.push(day.add(1, DAY).clone());
  }

  return calendar;
}

export const isToday = (day) => {
  return day.isSame(new Date(), DAY);
};

export const isWeekend = (day) => {
  return WEEKENDS.includes(day.format(DAY_FMT));
};

export const diffDays = (endDate, startDate) => {
  return moment(endDate).diff(moment(startDate), DAYS);
};
