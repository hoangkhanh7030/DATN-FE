import React from "react";
import { Typography, Grid } from "@material-ui/core";

import { useStyles } from "../style";
import { DAY_FMT, DATE_FMT, MAX_VIEW } from "../others/constants";
import { isToday, isWeekend } from "../others/buildCalendar";

const TODAY = "(today)";

export default function Days({ calendar, view }) {
  const classes = useStyles({ view });

  const styledDay = (day) =>
    isToday(day) ? classes.today : isWeekend(day) ? classes.weekend : null;

  const showToday = (day) => (isToday(day) && view !== MAX_VIEW ? TODAY : "");

  return calendar.map((day) => (
    <Grid item key={day} className={`${classes.calendarDay} ${styledDay(day)}`}>
      <Typography variant="h2">{day.format(DATE_FMT)} </Typography>

      <Typography
        className={`${isToday(day) ? classes.todayText : classes.dayText}`}
      >
        {`${day.format(DAY_FMT)} ${showToday(day)}`.toUpperCase()}
      </Typography>
    </Grid>
  ));
}
