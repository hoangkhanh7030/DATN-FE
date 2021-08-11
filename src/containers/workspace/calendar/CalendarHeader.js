import React from "react";
import { Typography, Grid } from "@material-ui/core";
import * as _ from "underscore";

import { useStyles } from "../style";
import Days from "./Days";

export default function CalendarHeader({
  calendar = [],
  view = 1,
  teamAmount = 0,
  rscAmount = 0,
}) {
  const classes = useStyles({ view });

  return _.isEmpty(calendar) ? null : (
    <>
      <Grid item className={`${classes.calendarDay} ${classes.leftWidth}`}>
        <Typography className={classes.textOverall}>
          {`${teamAmount} TEAMS`}
        </Typography>
        <Typography className={classes.textOverall}>
          {`${rscAmount} RESOURCES`}
        </Typography>
      </Grid>
      
      <Days calendar={calendar} view={view} />
    </>
  );
}
