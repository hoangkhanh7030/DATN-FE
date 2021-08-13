import React from "react";
import { Typography, Grid } from "@material-ui/core";
import * as _ from "underscore";

import { useStyles } from "../style";
import { DAY_FMT, DATE_FMT } from "../others/constants";
import { isToday, isWeekend } from "../others/buildCalendar";

export default function CalendarHeader({
  calendar = [],
  view = 1,
  teamAmount = 0,
  rscAmount = 0,
}) {
  const classes = useStyles({ view });

  const styledDay = (day) =>
    isToday(day) ? classes.today : isWeekend(day) ? classes.weekend : null;

  return _.isEmpty(calendar) ? (
    <></>
  ) : (
    <>
      <Grid item className={`${classes.calendarDay} ${classes.leftWidth}`}>
        <Typography className={classes.textOverall}>
          {teamAmount} TEAMS
        </Typography>
        <Typography className={classes.textOverall}>
          {rscAmount} RESOURCES
        </Typography>
      </Grid>

      {calendar.map((day) => (
        <Grid
          item
          key={day}
          className={`${classes.calendarDay} ${styledDay(day)}`}
        >
          <Typography variant="h2">{day.format(DATE_FMT)} </Typography>

          <Typography
            className={`${isToday(day) ? classes.todayText : classes.dayText}`}
          >
            {day.format(DAY_FMT).toUpperCase()}
            {isToday(day) && view !== 4 ? " (TODAY)" : ""}
          </Typography>
        </Grid>
      ))}
    </>
  );
}
